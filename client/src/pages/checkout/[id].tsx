import { ReactElement, useState, useEffect } from "react";
import { Card, CardContent, Typography, Chip, Box, Button, InputAdornment, TextField, Avatar, Grid, MenuItem } from "@mui/material";
import type { NextPage } from "next";

import { ethers } from "ethers";
import { getContract, contractAddress, maxMint, MAX_SUPPLY } from "../../Helpers/contractInfo";
import { getCurrency } from "../../Helpers/currency";
import { getProofs, getRoot } from "../../Helpers/merkleTree";
import { useWeb3React } from "@web3-react/core";

import { Container } from "@mui/material";
import { Status } from "@googlemaps/react-wrapper";
import { DataStore } from "aws-amplify";
import { EstateModel } from "../../models";
import _ from "lodash";

const Checkout: NextPage = ({ }) => {

  interface SaleData {
    ratio: number,
    circulatingSupply: string,
    currencyBalance: string,
    tokenBalance: string,
    currencyAllowance: string,
    tokenBought: string,
    currentStep: string,
    currency: string
  }

  const currencies = [
    { value: 'USD', label: '$' },
    { value: 'EUR', label: '€' }
  ]

  const { account, library } = useWeb3React();

  const [estates, updateEstates] = useState<EstateModel[]>([]);
  const [saleData, setSaleData] = useState<Partial<SaleData>>({ tokenBought: "0", currency: 'EUR' });
  const [userBuyStableInput, setUserBuyStableInput] = useState("0");

  const [error, setError] = useState(String);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaleData({ ...saleData, currency: event.target.value });
  };

  useEffect(() => {
    fetchData();
  }, [])

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
  }

  async function fetchData() {
    console.log(contractAddress, account)
    if (account && contractAddress) {
      console.log("fetchData");
      try {
        console.log("try");
        const myContractSigner = getContract(library, account);
        const sup = ethers.utils.formatEther(
          await myContractSigner.totalSupply()
        );

        const data = await myContractSigner.variables();

        const _currency = getCurrency(library, account);

        const _ratio = parseFloat(data.cexRatioX10000) / (10000 * 10);

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

        setSaleData({
          ...saleData,
          tokenBought: _tokenBought,
          currencyAllowance: _currencyAllowance,
          currencyBalance: _currencyBalance,
          tokenBalance: _tokenBalance,
          ratio: _ratio
        })

        const step = parseInt(data.step);
        switch (step) {
          case 0:
            setSaleData({ ...saleData, currentStep: "Soon" });
            break;
          case 1:
            setSaleData({ ...saleData, currentStep: "Buy Tokens" });
            break;
          case 2:
            setSaleData({ ...saleData, currentStep: "Soldout" });
            break;
        }
        setSaleData({ ...saleData, circulatingSupply: String(sup) });
        console.log("currentStep = ", saleData.currentStep)
      }
      catch (err: any) {
        const buff = err.message;
        setError(buff);
      }
    }
  }

  setUserBuyStableInput(param) {
    console.log(param);
  }

  const buyToken = () => {

  }
  
  return (
    <Container sx={{ mb: 10, width: `50vw` }}>

      <Card sx={{ borderRadius: "15px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        {/* TITLE */}
        <Typography variant="h3" sx={{fontSize: "30px"}}>Buy tokens for : <br /> {estates[0]?.name}</Typography>
        
        {/* INFO BOX */}
        <Box sx={{ flex: 1, alignSelf: "center", mt: 3 }}>
          <Typography>Price of token: 10€</Typography>
          <Typography>Token supply: 6500</Typography>
          <Typography>Max buy per address: 1950</Typography>
        </Box>

        {/* PROGRESSION BAR */}
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography sx={{ mt: 2 }}>Sale Progression</Typography>
          <Box sx={{ display: 'flex', flexDirection: "row", width: "300px", height: "20px", borderRadius: "10px", border: "solid 1px black"}}>
            <Box sx={{ width: `20%`, background: "linear-gradient(-90deg, rgba(81,213,255,1) 0%, rgba(253,181,42,1) 52%, rgba(255,122,104,1) 100%);", borderRadius: "30px", opacity: "30%" }}></Box>
            <Box sx={{ width: "auto" }}></Box>
          </Box>
        </Box>
        <Typography sx={{ alignSelf: "center", position: "relative", mb: 2}}>{ saleData.circulatingSupply }/{ MAX_SUPPLY }</Typography>
        {/* <Typography sx={{ alignSelf: "center", position: "relative", mb: 2}}>{ saleData.circulatingSupply?.substring(saleData.circulatingSupply?.indexOf("."), 0) }/{ MAX_SUPPLY }</Typography> */}

        {/* INPUT BUY STABLE */}

        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "flex-start", width: "400px" }}>
            <Typography>I want to buy (€)</Typography>
            <Box sx={{ width: "100%" }}>
              <TextField style={{ alignSelf: "flex-end", width: "70%" }} value={userBuyStableInput} onChange={() => setUserBuyStableInput(e.target.value)} label="Amount" id="outlined-basic" type="number" variant="outlined"/>
              <TextField id="outlined-select-currency" select label="Currency" value={saleData.currency} onChange={handleChange} style={{ width: "30%", borderRadius: '30px' }}>
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <a href="https://www.moonpay.com/" style={{ color: "#3A71FF" }}>Buy USDC</a>

          {/* INPUT BUY RET  */}

          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "flex-start", width: "400px" }}>
            <Typography>I want to buy (Real Estate Token) </Typography>
            <TextField sx={{ width: "100%" }} id="outlined-basic" type="number" label="Amount" variant="outlined" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "flex-start", width: "400px" }}>
            <Typography>Resume</Typography>
            <Box style={{ backgroundColor: "#F1F1F1", width: "100%" }} sx={{display: "flex", alignItems: "center"}}>
              <Typography>I buy XX RET for YY USDC</Typography>
            </Box>
          </Box>

          <Chip component="button" label="Buy tokens" color="primary" onClick={buyToken} clickable/>

        </Box>
        <Typography>*Once the proprety is totally financed and the paperwork completed, you will begin to receive your returns</Typography>
      </Card>
    </Container>
  )
};

export default Checkout;
