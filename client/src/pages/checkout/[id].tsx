import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  TextField,
  MenuItem,
  Checkbox,
} from "@mui/material";
import type { NextPage } from "next";

import { BigNumber, ethers } from "ethers";
import {
  getContract,
  contractAddress,
  maxMint,
  MAX_SUPPLY,
  symbol,
  scan,
} from "../../Helpers/contractInfo";
import { getCurrency } from "../../Helpers/currency";
import { getProofs, getRoot } from "../../Helpers/merkleTree";

import { useWeb3React } from "@web3-react/core";

import { Container } from "@mui/material";
import { DataStore } from "aws-amplify";
import { EstateModel } from "../../models";
import _, { max } from "lodash";
import { bignumber } from "mathjs";
import { json } from "stream/consumers";
import { whitelist } from "../../Helpers/whitelist";
import { setDefaultResultOrder } from "dns";

const Checkout: NextPage = () => {
  const currencies = [
    { value: "USD", label: "$" },
    { value: "EUR", label: "€" },
  ];

  const errorTypes = [
    { key: "SO", value: "Sold out" },
    { key: "RTH", value: "Ratio Too High" },
    { key: "RTL", value: "Ratio Too Low" },
    { key: "NWL", value: "Not Whitelisted" },
    { key: "EMS", value: "Exceed max supply" },
    { key: "TLCD", value: "Too low , check decimals!" },
    { key: "SINA", value: "Sale is Not active" },
    { key: "TABTMT", value: "This Address bought too much tokens" },
  ];

  const { account, library } = useWeb3React();

  const [estates, updateEstates] = useState<EstateModel[]>([]);

  const [circulatingSupply, setCirculatingSupply] = useState("");
  const [parsedSupply, setParsedSupply] = useState("");
  const [currencyBalance, setCurrencyBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [parsedTokenBalance, setParsedTokenBalance] = useState("");
  const [currencyAllowance, setCurrencyAllowance] = useState("");
  const [tokenBought, setTokenBought] = useState("");
  const [currentStep, setCurrentStep] = useState("");

  const [userBuyStableInput, setUserBuyStableInput] = useState(0);

  const [euroAmount, setEuroAmount] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");
  const [retAmount, setRetAmount] = useState("");
  const [parsedEuroAmount, setParsedEuroAmount] = useState("");
  const [parsedUsdcAmount, setParsedUsdcAmount] = useState("");
  const [parsedRetAmount, setParsedRetAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);

  const [maxBuy, setMaxBuy] = useState(0);
  const [txRef, setTxRef] = useState(String);
  const [totalTxRef, setTotalTxRef] = useState(String);
  const [mintNumber, setMintNumber] = useState(0);

  const [error, setError] = useState(String);

  const [cgvCheckbox, setCgvCheckbox] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    fetchEstates();
    const subscription = DataStore.observe(EstateModel).subscribe(() =>
      fetchEstates()
    );
    return () => subscription.unsubscribe();
  }, [account]);

  const fetchEstates = async () => {
    const estates = await DataStore.query(EstateModel);
    updateEstates(estates);
  };
  const toEur = (dollar: string) => {
    if (BigNumber.from(dollar).lt(10)) {
      return BigNumber.from(0);
    }
    const ret = BigNumber.from(dollar).mul(exchangeRate).div(10000);
    return ret.lt(10) ? BigNumber.from(0) : ret;
  };
  const toDoll = (euro: string) => {
    if (BigNumber.from(euro).lt(10)) {
      return BigNumber.from(0);
    }
    const ret = BigNumber.from(euro).mul(10000).div(exchangeRate);
    return ret.lt(10) ? BigNumber.from(0) : ret;
  };
  async function fetchData() {
    console.log("account: ", account);
    console.log("contractAddress: ", contractAddress);
    if (account && contractAddress) {
      try {
        const myContractSigner = getContract(library, account);

        const data = await myContractSigner.variables();

        const _currency = getCurrency(library, account);

        const _circulatingSupply = String(await myContractSigner.totalSupply());

        const _currencyAllowance = String(
          await _currency.allowance(account, contractAddress)
        );

        const _currencyBalance = String(await _currency.balanceOf(account));

        const _tokenBalance = String(await myContractSigner.balanceOf(account));

        const _tokenBought = String(
          await myContractSigner.tokensBought(account)
        );

        setExchangeRate(data.cexRatioX10000);
        setCirculatingSupply(_circulatingSupply);
        setParsedSupply(ethers.utils.formatEther(_circulatingSupply));
        setCurrencyBalance(_currencyBalance);
        setTokenBalance(_tokenBalance);
        setParsedTokenBalance(ethers.utils.formatEther(_tokenBalance));
        setCurrencyAllowance(_currencyAllowance);
        setTokenBought(_tokenBought);

        const step = parseInt(data.step);

        switch (step) {
          case 0:
            setCurrentStep("Sale Not Started");
            break;
          case 1:
            setCurrentStep("Sale Ongoing");
            break;
          case 2:
            setCurrentStep("Sale Soldout");
            break;
        }
        setCurrentStep(data.step);
      } catch (err: any) {
        if (JSON.stringify(err).includes("-3200")) {
          setError("Connection problem due to the wallet please refresh");
        }
      }
    }
  }
  const getMax = () => {
    const canBuy = BigNumber.from(currencyBalance)
      .mul(exchangeRate)
      .div(10000 * 10);
    const canTheoricBuy = BigNumber.from(
      ethers.utils.parseEther(String(maxMint))
    ).sub(BigNumber.from(tokenBought));
    const bestBuy = canBuy.lt(canTheoricBuy) ? canBuy : canTheoricBuy;

    const maxBeforeSoldout = ethers.utils
      .parseEther(String(MAX_SUPPLY))
      .sub(circulatingSupply);
    const lastBuy = bestBuy.gt(maxBeforeSoldout) ? maxBeforeSoldout : bestBuy;
    return lastBuy;
  };

  const euroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    let input = parseFloat(e.target.value > "0" ? e.target.value : "0");
    let max = getMax();
    input = Math.min(
      Math.max(input, 0),
      parseInt(ethers.utils.formatEther(max.mul(10)))
    );
    const goodInput = ethers.utils.parseEther(String(input));
    const usdc = toDoll(String(goodInput));
    const pUsdc = ethers.utils.formatEther(usdc);
    setEuroAmount(String(goodInput));
    setParsedEuroAmount(String(input));
    setUsdcAmount(String(usdc));
    setParsedUsdcAmount(pUsdc);
    setRetAmount(String(goodInput.div(10)));
    setParsedRetAmount(String(input / 10));
  };

  const usdcChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    console.log(e.target.value);

    let input = parseFloat(e.target.value > "0" ? e.target.value : "0");
    let max = getMax();
    input = Math.min(
      Math.max(input, 0),
      parseInt(String(max)) < 10
        ? 0
        : parseFloat(
            ethers.utils.formatEther(
              toDoll(String(max.mul(10000).div(exchangeRate)))
            )
          )
    );

    const usdc = String(ethers.utils.parseEther(String(input)));
    const euro = toEur(usdc);
    const Ret = euro.div(10);
    const fEuro = ethers.utils.formatEther(euro);
    const fRet = ethers.utils.formatEther(Ret);
    setEuroAmount(String(euro));
    setUsdcAmount(usdc);
    setRetAmount(String(Ret));
    setParsedEuroAmount(fEuro);
    setParsedUsdcAmount(String(input));
    setParsedRetAmount(fRet);
  };

  const retChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    console.log(e.target.value);
    let input = parseFloat(e.target.value > "0" ? e.target.value : "0");
    let max = getMax();
    input = Math.min(
      Math.max(input, 0),
      parseInt(ethers.utils.formatEther(max))
    );
    const token = ethers.utils.parseEther(String(input));
    const euro = String(token.mul(10));
    let usdc = toDoll(euro);
    let pUsdc = ethers.utils.formatEther(usdc);
    setEuroAmount(euro);
    setUsdcAmount(String(usdc));
    setRetAmount(String(token));
    setParsedEuroAmount(String(input * 10));
    setParsedUsdcAmount(pUsdc);
    setParsedRetAmount(String(input));
  };

  const approve = async () => {
    if (cgvCheckbox === false) return;
    setTxRef("");
    setError("");
    try {
      console.log("entered in fct");
      const _currency = getCurrency(library, account!);
      let tx = await _currency.approve(contractAddress, usdcAmount);
      setError("Transaction pending ...");
      const receipt = await tx.wait();
      console.log(receipt);
      setTxRef(tx.hash);
      setTotalTxRef(scan + txRef);
      setError("");
      setCurrencyAllowance(usdcAmount);
    } catch (err: any) {
      console.log(JSON.stringify(err));
      if (!error.includes("rejected")) {
        setError("Transaction rejected");
      } else {
        let ach = "Tx error : " + String(err);
        setError(ach);
      }
    }
  };

  const buy = async () => {
    if (cgvCheckbox === false) return;
    setError("");
    setTxRef("");
    try {
      console.log("entered in fct");
      const myContractSigner = getContract(library, account!);
      setError("Transaction pending ...");
      const tx = await myContractSigner.buy(
        account,
        retAmount,
        getProofs(account!)
      );
      const receipt = await tx.wait();
      console.log(receipt);
      setTxRef(tx.hash);
      setTotalTxRef(scan + txRef);
      setError("");
      const newBalance = BigNumber.from(currencyBalance).sub(usdcAmount);
      const newTokenBalance = BigNumber.from(tokenBalance).add(retAmount);
      const newSupply = BigNumber.from(circulatingSupply).add(retAmount);
      setTokenBalance(String(newTokenBalance));
      setTokenBalance(ethers.utils.formatEther(newTokenBalance));
      setCirculatingSupply(String(newSupply));
      setParsedSupply(ethers.utils.formatEther(newSupply));
      setCurrencyBalance(String(newBalance));
      setCurrencyAllowance(
        String(BigNumber.from(currencyAllowance).sub(usdcAmount))
      );
      setParsedSupply(ethers.utils.formatEther(newSupply));
    } catch (err: any) {
      const error = String(await err);
      if (!error.includes("reason") && error.includes("insufficient")) {
        setError("Not enough funds for gas and value");
      } else if (error.includes("reject")) {
        setError("Transaction rejected");
      } else if (!error.includes("reason")) {
        setError(error);
      } else {
        const goodError = JSON.stringify(err.reason)
          .replace("execution reverted:", "")
          .replaceAll('"', "")
          .replaceAll(" ", "");
        const buffObj = errorTypes.filter(function (errorType) {
          return errorType.key === goodError;
        });
        if (buffObj && buffObj[0].value) {
          setError(buffObj[0].value);
        } else {
          setError(goodError);
        }
      }
      console.log("error", error);
      // We have to push the error message one the screen
    }
    console.log("cgvCheckbox", cgvCheckbox);
  };

  const changeCheckbox = () => {
    setCgvCheckbox(!cgvCheckbox);
  };

  // if (!account) {
  //   alert("please Reconnect your wallet");
  // }

  return (
    <Container sx={{ mb: 10, width: `45vw`, minWidth: `550px` }}>
      {account && whitelist.includes(account) ? (
        <Card
          sx={{
            borderRadius: "15px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* TITLE */}
          <Typography variant="h3" sx={{ fontSize: "30px" }}>
            {estates[0]?.name}
          </Typography>

          {/* INFO BOX */}
          <Box sx={{ flex: 1, alignSelf: "center", mt: 3, fontSize: "10px" }}>
            <Typography sx={{ fontSize: "15px" }}>Token Price: 10€</Typography>
            <Typography sx={{ fontSize: "15px" }}>
              Token supply: 6500
            </Typography>
            <Typography sx={{ fontSize: "15px" }}>
              Max mint per address: {maxMint}
            </Typography>
          </Box>

          {/* PROGRESSION BAR */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mt: 2 }}>
              Sale Progression:{" "}
              {circulatingSupply > "0"
                ? parseFloat(
                    ethers.utils.formatEther(
                      BigNumber.from(circulatingSupply).mul(100).div(MAX_SUPPLY)
                    )
                  ).toFixed(2)
                : 0}{" "}
              %{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "300px",
                height: "20px",
                borderRadius: "10px",
                border: "solid 1px black",
              }}
            >
              <Box
                sx={{
                  width: `${
                    circulatingSupply > "0"
                      ? parseFloat(
                          ethers.utils.formatEther(
                            BigNumber.from(circulatingSupply)
                              .mul(100)
                              .div(MAX_SUPPLY)
                          )
                        ).toFixed(2)
                      : 0
                  }%`,
                  background:
                    "linear-gradient(-90deg, rgba(81,213,255,1) 0%, rgba(253,181,42,1) 52%, rgba(255,122,104,1) 100%);",
                  borderRadius: "30px",
                  opacity: "30%",
                }}
              ></Box>
              <Box sx={{ width: "auto" }}></Box>
            </Box>
          </Box>
          <Typography sx={{ alignSelf: "center", position: "relative", mb: 2 }}>
            {parseFloat(parsedSupply) > 0 ? parsedSupply : 0}/{MAX_SUPPLY}
          </Typography>
          <Typography sx={{ alignSelf: "center", position: "relative", mb: 2 }}>
            Your {symbol} balance {parsedTokenBalance}
          </Typography>
          {/* <Typography sx={{ alignSelf: "center", position: "relative", mb: 2}}>{ saleData.circulatingSupply?.substring(saleData.circulatingSupply?.indexOf("."), 0) }/{ MAX_SUPPLY }</Typography> */}

          {/* INPUT BUY STABLE */}

          <Box
            sx={{
              mb: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "400px",
              }}
            >
              <Typography sx={{ mb: 1 }}>I want to buy for</Typography>
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <TextField
                  style={{ alignSelf: "flex-end", width: "70%" }}
                  sx={{ mr: 2 }}
                  value={parsedEuroAmount}
                  onChange={euroChange}
                  label="euro (€)"
                  id="outlined-basic"
                  type="number"
                  variant="outlined"
                />
                <TextField
                  style={{ alignSelf: "flex-end", width: "70%" }}
                  value={parsedUsdcAmount}
                  onChange={usdcChange}
                  label="usdc ($)"
                  id="outlined-basic"
                  type="number"
                  variant="outlined"
                />
              </Box>
              <a
                href="https://www.moonpay.com/"
                style={{ color: "#3A71FF", marginLeft: "320px" }}
              >
                Buy USDC
              </a>
            </Box>

            {/* INPUT BUY RET  */}

            <Box
              sx={{
                mb: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "400px",
              }}
            >
              <Typography sx={{ mb: 1 }}>
                I want to buy (Real Estate Token){" "}
              </Typography>
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  value={parsedRetAmount}
                  onChange={retChange}
                  label="Amount"
                  variant="outlined"
                  id="outlined-basic"
                  type="number"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "400px",
              }}
            >
              <Typography sx={{ mb: 1 }}>Resume</Typography>
              <Box
                style={{
                  backgroundColor: "#F1F1F1",
                  width: "100%",
                  padding: "15px",
                  borderRadius: "5px",
                }}
                sx={{ display: "flex", alignItems: "center", mb: 3 }}
              >
                <Typography>
                  I buy {parsedRetAmount} RET for {parsedUsdcAmount} USDC
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Checkbox checked={cgvCheckbox} onChange={changeCheckbox} />
              <Typography>
                I{"'"}ve read and accepted the general sale aggrement
              </Typography>
            </Box>

            {!cgvCheckbox ? (
              <Typography sx={{ mb: 2 }}>
                please accept sale agreement first
              </Typography>
            ) : (
              <Typography></Typography>
            )}
            {error ? (
              <span> {error}</span>
            ) : (
              <>
                <span>Succcess, here is yout tx:</span>
                <span v-bind:href={totalTxRef}>{txRef}</span>
              </>
            )}
            {usdcAmount > currencyAllowance ? (
              <Chip
                component="button"
                label="Approve"
                color={cgvCheckbox === true ? "primary" : "default"}
                onClick={approve}
                clickable={cgvCheckbox === true ? true : false}
              />
            ) : (
              <Chip
                component="button"
                label="Buy tokens"
                color={cgvCheckbox === true ? "primary" : "default"}
                onClick={buy}
                clickable={cgvCheckbox === true ? true : false}
              />
            )}
          </Box>
        </Card>
      ) : (
        <Card
          sx={{
            borderRadius: "15px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {account ? (
            <span> Not Whitelisted</span>
          ) : (
            <span>Please Connect your wallet</span>
          )}
        </Card>
      )}
    </Container>
  );
};

export default Checkout;
