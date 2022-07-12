import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  InputAdornment,
  TextField,
  Avatar,
  Grid,
} from "@mui/material";
import GraphAscendIcon from "../common/components/icons/GraphAscendIcon";
import LightningIcon from "../common/components/icons/LightningIcon";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Storage } from "@aws-amplify/storage";
import { WaitListItemModel } from "../models";
import { DataStore } from "aws-amplify";
import BuyButtons from "./BuyingComponnent";

const Injected = new InjectedConnector({
  supportedChainIds: [137, 80001], // Ethereum, Polygon (need to remove ethereum)
});
// const Walletconnect = new WalletConnectConnector({
//   rpc: `https://mainnet.infura.io/v3/yBX3L8xfJTO6WWspTMe0jtRG1tmP30Uu`,
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
// });

const CustomForm = ({ assetId }: any) => {
  const { activate, deactivate } = useWeb3React();
  const { active, library, chainId, account } = useWeb3React();
  const [email, setEmail] = useState("");

  const clearFields = () => {
    setEmail("");
  };

  const handleEmailClick = async () => {
    if (!active) {
      await handleActivate();
    }
    if (email.length > 0) {
      await signAndVerifyMessage(email);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleActivate = async () => {
    await activate(Injected, (e) =>
      alert("Please switch to the Polygon Mainnet.")
    );
  };

  const signAndVerifyMessage = async (message: string) => {
    try {
      const signer = library.getSigner(account);
      const signature = await signer.signMessage(message);
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      if (signerAddr == account) {
        // onSubmitted({ MERGE0: email, MERGE2: account, tags: `${assetName}` })
        // onSubmitted({ MERGE0: email, MERGE17: account })
        try {
          await DataStore.save(
            new WaitListItemModel({
              emailAddress: email,
              publicKey: account,
              estatemodelID: assetId,
            })
          );
          clearFields();
          alert("Your address has been added to the waitlist !");
        } catch (error) {
          alert("Error, please insert a valid email address");
        }
        return true;
      }
    } catch (err) {
      alert("Error, please connect a valid wallet");
    }
    return false;
  };

  return (
    <CardContent
      sx={{
        // display: 'flex', justifyContent: 'flex-end', flexFlow: 'row wrap', gap: 2,
        "&:last-child": { paddingBottom: 0 },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item sm="auto">
          <Box sx={{ alignSelf: "center" }}>
            <Typography variant="h6">Coming soon</Typography>
            <Typography variant="body2">
              Join waitlist to unlock access
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm>
          <TextField
            size="small"
            sx={{ width: "100%", alignSelf: "center" }}
            placeholder="Email address"
            InputProps={{
              value: email,
              type: "email",
              onChange: handleEmailChange,
            }}
          ></TextField>
        </Grid>
        <Grid item sm="auto" sx={{ textAlign: "right" }}>
          <Chip
            sx={{ alignSelf: "center" }}
            label="Join Waitlist"
            color="primary"
            onClick={handleEmailClick}
            clickable
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};

const LargeAssetCard = ({ ...props }) => {
  const [cover, updateCover] = useState<string>();

  useEffect(() => {
    fetchCover();
  }, []);

  const fetchCover = async () => {
    const cover = await Storage.get(`${props.slug}/cover.jpg`, {
      level: "public",
    });
    updateCover(cover);
  };

  const loc = `${props.address.cityName || ""}, ${props.address.state || ""}`;

  return (
    <Card
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        marginBottom: 5,
        borderRadius: "20px",
      }}
    >
      <CardContent sx={{ display: "flex", pb: 0 }}>
        <CardContent>
          <Avatar sx={{ width: 100, height: 100 }} src={cover} />
        </CardContent>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography gutterBottom variant="h6" component="div">
            {props.name} ({loc})
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignContent: "flex-start",
              flexFlow: "row wrap",
              gap: "12px",
            }}
          >
            <Chip
              icon={
                <span style={{ margin: "7px 0px 0px 7px" }}>
                  <GraphAscendIcon size={20} color="white" />
                </span>
              }
              label={`${props.grossYield}% Yield`}
              color="primary"
            />
            <Chip
              icon={
                <span style={{ margin: "7px 0px 0px 7px" }}>
                  <LightningIcon size={20} color="#111029" />
                </span>
              }
              label={`${props.debt}% debt`}
              variant="outlined"
            />
            {/* {props.hasWaitlist ? <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><ClockIcon size={20} color="#111029" /></span>} label='Waitlist' variant="outlined" /> : <></>}
                        {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>} */}
          </Box>
          {/* <Typography variant="body2" color="text.secondary" paragraph>
                    {props.shortDescription}
                </Typography> */}
        </CardContent>
        {/* <CardContent sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><MarkIcon size={20} color="#111029" /></span>} label={`${loc}`} variant="outlined" />
                <Chip label={`${props.apr}% APR`} variant="outlined" />
                {props.hasWaitlist ? <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><ClockIcon size={20} color="#111029" /></span>} label='Waitlist' variant="outlined" /> : <></>}
                {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>}
            </CardContent> */}
      </CardContent>

      <CardContent sx={{ pt: 0, display: props.isWaitlist ? "none" : "block" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 2,
            "&:last-child": { paddingBottom: 0 },
            height: 80,
          }}
        >
          <Box sx={{ flex: 1, alignSelf: "center" }}>
            <Typography variant="h6">Buy real estate tokens</Typography>
            <Typography variant="body2">
              Use USD-C and receive real estate tokens
            </Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "55%", alignSelf: "center" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image src="/usdc.png" width="25px" height="25px" />
                </InputAdornment>
              ),
            }}
            placeholder="Amount"
          ></TextField>
          <Button
            sx={{ alignSelf: "center" }}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Connect Wallet
          </Button>
        </CardContent>
      </CardContent>
      {/* <CardContent sx={{ pt: 0, display: props.isWaitlist ? "block" : "none" }}>
        <CustomForm assetId={props.id} /> */}
      {/* </CardContent> */}
      <BuyButtons />
    </Card>
  );
};

export default LargeAssetCard;
