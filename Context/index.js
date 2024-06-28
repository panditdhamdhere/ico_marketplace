import { React, createContext, useState } from "react";
import { ethers } from "ethers";
import WebModal from "web3modal";
import toast from "react-hot-toast";

// internal imports
import {
  ERC20Generator,
  ERC20Generator_BYTE_CODE,
  handleNetworkSwitch,
  shortenAddress,
  ICO_MARKETPLACE_ADDRESS,
  icoMarketPlaceContract,
  tokenContract,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
  ERC20Generator_ABI,
} from "./constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // state variables
  const [address, setAddress] = useState();
  const [accountBalance, setAccountBalance] = useState(null);
  const [loader, setLoader] = useState(false);
  const [recall, setRecall] = useState(0);
  const [currency, setCurrency] = useState("ETH");

  // component state variables
  const [openBuyToken, setOpenBuyToken] = useState(false);
  const [openWithdrawToken, setOpenWithdrawToken] = useState(false);
  const [openTransferToken, setOpenTransferToken] = useState(false);
  const [openTokenCreator, setOpenTokenCreator] = useState(false);
  const [openCreateICO, setOpenCreateICO] = useState(false);

  const notifySuccess = (msg) => toast.success(msg, { duration: 200 });
  const notifyError = (msg) => toast.error(msg, { duration: 200 });

  // functions

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return notifyError("No Wallet Found");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(connection);
        const getbalance = await provider.getBalance(accounts[0]);
        const balance = ethers.utils.formatEther(getbalance);
        setAccountBalance(balance);
        return accounts[0];
      } else {
        return notifyError("No Account Found");
      }
    } catch (error) {
      console.log(error);
      notifyError("No Account Found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return notifyError("No Wallet Found");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(connection);
        const getbalance = await provider.getBalance(accounts[0]);
        const balance = ethers.utils.formatEther(getbalance);
        setAccountBalance(balance);
        return accounts[0];
      } else {
        return notifyError("No Account Found");
      }
    } catch (error) {
      console.log(error);
      notifyError("No Account Found");
    }
  };

  // main function

  const _deployContract = async (
    signer,
    account,
    name,
    symbol,
    supply,
    imgURL
  ) => {
    try {
      const factory = new ethers.ContractFactory(
        ERC20Generator_ABI,
        ERC20Generator_BYTE_CODE,
        signer
      );

      const totalSupply = Number(supply);
      const _initialSupply = ethers.utils.parseEther(
        totalSupply.toString(),
        "ether"
      );

      let contract = await factory.deploy(_initialSupply, name, symbol);

      const transaction = await contract.deployed();

      if (contract.address) {
        const today = Date.now();
        let date = new Date(today);
        const _tokenCreatedDate = date.toLocaleDateString("en-US");

        const _token = {
          account: account,
          supply: supply.toString(),
          name: name,
          symbol: symbol,
          tokenAddress: contract.address,
          transactionHash: contract.deployTransaction.hash,
          createdAt: _tokenCreatedDate,
          logo: imgURL,
        };

        let tokenHistory = [];

        const history = localStorage.getItem("TOKEN_HISTORY");

        if (history) {
          tokenHistory = JSON.parse(localStorage.getItem("TOKEN_HISTORY"));
          tokenHistory.push(_token);
          localStorage.setItem("TOKEN_HISTORY", tokenHistory);
          setLoader(false);
          setRecall(recall + 1);
          setOpenTokenCreator(false);
        } else {
          tokenHistory.push(_token);
          localStorage.setItem("TOKEN_HISTORY", tokenHistory);
          setLoader(false);
          setRecall(recall + 1);
          setOpenTokenCreator(false);
        }
      }
    } catch (error) {
      setLoader(false);
      notifyError("Something went wrong, try later");
      console.log(error);
    }
  };

  const createERC20 = async (token, account, imgURL) => {
    const { name, symbol, supply } = token;
    try {
      setLoader(true);
      notifySuccess("Creating Token...");

      if (!name || !symbol || !supply) {
        notifyError("Data missing, All fields are required");
      } else {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        _deployContract(signer, account, name, symbol, supply, imgURL);
      }
    } catch (error) {
      setLoader(false);
      notifyError("Something went wrong, try later");
      console.log(error);
    }
  };

  const getAllIcoSaleToken = async (icoSale) => {
    try {
      const { address, price } = icoSale;
      if (!address || !price) return notifyError("Data is missing");

      setLoader(true);
      notifySuccess("Creating ICO Sale...");

      await connectWallet();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserIcoSaleToken = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const createIcoSale = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const buyToken = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const transferToken = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawToken = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};
