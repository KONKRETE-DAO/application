import { React, useState, useEffect } from "react";
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
} from "../../Helpers/contractInfo";
import { getCurrency } from "../../Helpers/currency";
import { getProofs, getRoot } from "../../Helpers/merkleTree";
import { useWeb3React } from "@web3-react/core";

import { Container } from "@mui/material";
import { DataStore, sectionFooterPrimaryContent } from "aws-amplify";
import { EstateModel } from "../../models";
import _ from "lodash";
import { flexbox } from "@mui/system";

const Checkout: NextPage = () => {
  const currencies = [
    { value: "USD", label: "$" },
    { value: "EUR", label: "€" },
  ];

  const errorTypes = {
    RTH: "Ratio Too High",
    RTL: "Ratio Too Low",
    TLCD: "Too low , check decimals!",
    SINA: "Sale is Not active",
    SO: "Sold out",
    NWL: "Not Whitelisted",
    EMS: "Exceed max supply",
    TABTMT: "This Address bought too much tokens",
  };

  const { account, library } = useWeb3React();

  const [estates, updateEstates] = useState<EstateModel[]>([]);

  const [ratio, setRatio] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [currencyBalance, setCurrencyBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [currencyAllowance, setCurrencyAllowance] = useState("");
  const [tokenBought, setTokenBought] = useState("");
  const [currentStep, setCurrentStep] = useState("");

  const [userBuyStableInput, setUserBuyStableInput] = useState(0);

  const [euroAmount, setEuroAmount] = useState(0);
  const [usdcAmount, setUsdcAmount] = useState(0);
  const [retAmount, setRetAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  const [maxBuy, setMaxBuy] = useState(0);
  const [txRef, setTxRef] = useState(String);
  const [mintNumber, setMintNumber] = useState(0);

  const [error, setError] = useState(String);

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

  async function fetchData() {
    console.log(contractAddress, account);
    if (account && contractAddress) {
      console.log("in fetchData");
      try {
        console.log("in fetchData try");
        const myContractSigner = getContract(library, account);

        const data = await myContractSigner.variables();

        const _currency = getCurrency(library, account);

        const _ratio = parseFloat(data.cexRatioX10000) / (10000 * 10);

        const _circulatingSupply = ethers.utils.formatEther(
          await myContractSigner.totalSupply()
        );

        const _currencyAllowance = ethers.utils.formatEther(
          await _currency.allowance(account, contractAddress)
        );

        const _currencyBalance = ethers.utils.formatEther(
          await _currency.balanceOf(account)
        );

        const _tokenBalance = ethers.utils.formatEther(
          await myContractSigner.balanceOf(account)
        );

        const _tokenBought = ethers.utils.formatEther(
          await myContractSigner.tokensBought(account)
        );

        setExchangeRate(_ratio * 10);
        setRatio(_ratio);
        setCirculatingSupply(parseInt(_circulatingSupply));
        setCurrencyBalance(_currencyBalance);
        setTokenBalance(_tokenBalance);
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
        const buff = err.message;
        setError(buff);
      }
    }
  }

  const euroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    let input = parseInt(e.target.value);
    input = Math.min(Math.max(input, 0), 19500);
    let usdc = parseFloat((input / exchangeRate).toFixed(2));
    setEuroAmount(input);
    setUsdcAmount(usdc);
    setRetAmount(input / 10);
  };

  const usdcChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    let input = parseInt(e.target.value);
    input = Math.min(Math.max(input, 0), 19500 * exchangeRate);
    let euro = parseFloat((input * exchangeRate).toFixed(2));
    setEuroAmount(euro);
    setUsdcAmount(input);
    setRetAmount(euro / 10);
  };

  const retChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    let input = parseInt(e.target.value);
    input = Math.min(Math.max(input, 0), 1950);
    let usdc = parseFloat(((input * 10) / exchangeRate).toFixed(2));
    setEuroAmount(input * 10);
    setUsdcAmount(usdc);
    setRetAmount(input);
  };

  const approve = async () => {
    setTxRef("");
    setError("");
    try {
      console.log("entered in fct");
      const _currency = getCurrency(library, account!);
      let tx = await _currency.approve(
        contractAddress,
        ethers.utils.parseEther(String(usdcAmount))
      );
      setError("Transaction pending ...");
      const receipt = await tx.wait();
      console.log(receipt);
      setTxRef(tx.hash);
      setError("");
      fetchData();
    } catch (err: any) {
      if (!error.includes("rejected")) {
        setError("Transaction rejected");
      } else {
        let ach = "Tx error : " + String(err);
        setError(ach);
      }
    }
  };

  const buy = async () => {
    setError("");
    setTxRef("");
    try {
      console.log("entered in fct");
      const myContractSigner = getContract(library, account!);
      setError("Transaction pending ...");
      const tx = await myContractSigner.buy(
        account,
        ethers.utils.parseEther(String(usdcAmount)),
        getProofs(account!)
      );

      const receipt = await tx.wait();
      console.log(receipt);
      setTxRef(tx.hash);
      setError("");
      fetchData();
      console.log(account);
    } catch (err: any) {
      const error = String(err);
      if (!error.includes("reason") && error.includes("insufficient")) {
        setError("Not enough funds for gas and value");
      } else if (error.includes("rejected")) {
        setError("Tsransaction rejected");
      } else if (!error.includes("reason")) {
        setError(error);
      } else {
        const goodError = JSON.stringify(err.reason)
          .replace("execution reverted:", "")
          .replaceAll('"', "")
          .replaceAll(" ", "");

        setError(errorTypes[goodError]);
      }
      console.log("error", error);
      // We have to push the error message one the screen
    }
  };

  return (
    <Container sx={{ mb: 10, width: `45vw`, minWidth: `550px` }}>
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
          <Typography sx={{ fontSize: "15px" }}>Token supply: 6500</Typography>
          <Typography sx={{ fontSize: "15px" }}>
            Max buy per address: 1950
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
            {circulatingSupply ? (circulatingSupply * 100) / MAX_SUPPLY : 0} %{" "}
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
                  circulatingSupply ? (circulatingSupply * 100) / MAX_SUPPLY : 0
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
          {circulatingSupply}/{MAX_SUPPLY}
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
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
              <TextField
                style={{ alignSelf: "flex-end", width: "70%" }}
                sx={{ mr: 2 }}
                value={euroAmount}
                onChange={euroChange}
                label="euro (€)"
                id="outlined-basic"
                type="number"
                variant="outlined"
              />
              <TextField
                style={{ alignSelf: "flex-end", width: "70%" }}
                value={usdcAmount}
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
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
              <TextField
                sx={{ width: "100%" }}
                value={retAmount}
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
                I buy {retAmount} RET for {usdcAmount} USDC
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
              I've read and accepted the general sale aggrement
            </Typography>
          </Box>

          <span>{error}</span>
          {parseFloat(currencyAllowance) < parseFloat(usdcAmount) ? (
            <Chip
              component="button"
              label="Approve"
              color="primary"
              onClick={approve}
              clickable
            />
          ) : (
            <Chip
              component="button"
              label="Buy tokens"
              color="primary"
              onClick={buy}
              clickable
            />
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default Checkout;
