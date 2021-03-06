import Typography from "@mui/material/Typography";

import { Box, Container, Divider } from "@mui/material";

const Footer = ({ ...props }) => {
  const style = {
    position: "relative",
    marginTop: "auto",
    bgcolor: "#111029",
  };
  const addChain = async () => {
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Matic Mainnet",
            nativeCurrency: {
              name: "Matic Token",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://polygon-rpc.com"],
            blockExplorerUrls: ["https://polygonscan.com"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Box sx={style}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "125px",
          padding: "12px",
        }}
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
            color: "white",
          }}
        >
          Konkrete
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ borderColor: "#557598", mb: "12px" }}></Divider>
          <Typography sx={{ color: "white" }}>
            Copyright © Konkrete 2022
          </Typography>
        </Box>
        <button onClick={addChain}>Add Polygon Network to metamask</button>
      </Container>
    </Box>
  );
};

export default Footer;
