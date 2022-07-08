import { BigNumber, ethers } from "ethers";
import { useState, useEffect } from "react";
import styled from "styled-components";

import {
  getContract,
  contractAddress,
  maxMint,
  tokenPrice,
  MAX_SUPPLY,
} from "../Helpers/contractInfo";
import { getCurrency } from "../Helpers/currency";
import { getProofs, getRoot } from "../Helpers/merkleTree";
import { useWeb3React } from "@web3-react/core";
import { curry } from "lodash";

const BuyButtons = () => {
  //connector, library, chainId, account, activate, deactivate
  const { account, library, chainId } = useWeb3React();
  const [mintNumber, setMintNumber] = useState(0);
  const [supply, setSupply] = useState("??");
  const [error, setError] = useState(String);
  const [ratio, setRatio] = useState(Number);
  const [currencyBalance, setCurrencyBalance] = useState(String);
  const [tokenBalance, setTokenBalance] = useState(String);
  const [currencyAllowance, setCurrencyAllowance] = useState(String);
  const [tokenBought, setTokenBought] = useState(String);
  const [maxBuy, setMaxBuy] = useState(0);
  const [txRef, setTxRef] = useState(String);

  // console.log('🚀 ~ file: index.tsx ~ line 21 ~ MintButtons ~ error', error);
  const [currentStep, setCurrentStep] = useState("");

  //web3react
  const buy = async () => {
    setError("");
    setTxRef("");
    try {
      console.log("entered in fct");
      const myContractSigner = getContract(library, account!);
      setError("Transaction pending ...");
      const tx = await myContractSigner.buy(
        account,
        ethers.utils.parseEther(String(mintNumber / ratio)),
        getProofs(account!)
      );

      const receipt = await tx.wait();
      console.log(receipt);
      setTxRef(tx.hash);
      setError("");
      console.log(account);
    } catch (err: any) {
      const error = String(err);
      if (!error.includes("reason") && error.includes("insufficient")) {
        setError("Not enough funds for gas and value");
      } else if (!error.includes("reason")) {
        setError(error);
      } else {
        const goodError = JSON.stringify(err.reason).replace(
          "execution reverted:",
          ""
        );
        setError(goodError);
      }
      // We have to push the error message one the screen
    }
  };
  const approve = async () => {
    setTxRef("");
    setError("");
    try {
      console.log("entered in fct");
      const _currency = getCurrency(library, account!);
      let tx = await _currency.approve(
        contractAddress,
        ethers.utils.parseEther(String(mintNumber / ratio))
      );
      setError("Transaction pending ...");
      const receipt = await tx.wait();
      console.log(receipt);
      setTxRef(tx.hash);
      setError("");
    } catch (err: any) {
      let ach = "Tx error : " + String(err);
      setError(ach);
    }
  };

  useEffect(() => {
    fetchData();
  }, [account]);

  async function fetchData() {
    if (account && contractAddress) {
      try {
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

        setTokenBought(_tokenBought);
        setCurrencyAllowance(_currencyAllowance);
        setCurrencyBalance(_currencyBalance);
        setTokenBalance(_tokenBalance);
        setRatio(_ratio);

        const step = parseInt(data.step);
        switch (step) {
          case 0:
            setCurrentStep("Soon");
            break;
          case 1:
            setCurrentStep("Buy Tokens");
            break;
          case 2:
            setCurrentStep("Soldout");
            break;
        }

        setSupply(String(sup));
      } catch (err: any) {
        const buff = err.message;
        setError(buff);
      }
    }
  }
  const updateMintNumber = (event: any) => {
    setMintNumber(event.target.value);
  };
  const whichUse = async () => {
    switch (currentStep) {
      case "Soon" || "Soldout":
        return null;
      case "Buy Tokens":
        parseFloat(currencyAllowance) < mintNumber / ratio ? approve() : buy();
        break;
    }
  };
  const getMax = () => {
    fetchData();
    console.log("currencyAllowance --->" + currencyAllowance);
    console.log("_currencyBalance --->" + currencyBalance);
    console.log("ratio --->" + ratio);
    const theoric = parseFloat(currencyBalance) * ratio;
    console.log("theoric -->" + theoric);
    if (!theoric) {
      setMintNumber(0);
      return;
    }
    const presque = maxMint > theoric ? theoric : maxMint;
    const result = presque - parseFloat(parseFloat(tokenBought).toFixed(2));
    console.log(result);
    setMaxBuy(result);
    setMintNumber(result);
  };

  return (
    <>
      <div>
        <span>
          {supply}/{MAX_SUPPLY}
        </span>
      </div>
      {currentStep == "Buy Tokens" ? (
        <div>
          <label>
            <input type="text" onChange={updateMintNumber} value={mintNumber} />
          </label>
          <button className="mintButton" onClick={whichUse}>
            {parseFloat(currencyAllowance) < mintNumber &&
            currentStep === "Buy Tokens"
              ? "Approve first"
              : currentStep}
          </button>
          <span>
            {mintNumber !== undefined ? (mintNumber / ratio).toFixed(2) : 0}{" "}
            USDC
          </span>
        </div>
      ) : (
        <span>{currentStep}</span>
      )}

      {account ? <a>You possess {tokenBalance}</a> : ""}
      {currentStep === "Buy Tokens" ? (
        <button className="mintButton" onClick={getMax}>
          MAX
        </button>
      ) : (
        ""
      )}
      <div>
        <a>{error}</a>
        {!txRef ? (
          ""
        ) : (
          <a href={`https://mumbai.polygonscan.com/tx/${txRef}`}>
            Succeeded !! Here's your tx :<a className="lol">{txRef}</a>
          </a>
        )}
      </div>
    </>
  );
};
export default BuyButtons;
