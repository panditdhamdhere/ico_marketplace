import React, { useState } from "react";
import toast from "react-hot-toast";

// internal imports
import { useStateContext } from "../Context/index";
import Header from "../Components/Header";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Table from "../Components/Table";
import PreSaleList from "../Components/PreSaleList";
import UploadLogo from "../Components/UploadLogo";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import ICOMarket from "../Components/ICOMarket";
import TokenCreator from "../Components/TokenCreator";
import TokenHistory from "../Components/TokenHistory";
import Marketplace from "../Components/Marketplace";
import CreateICO from "../Components/CreateICO";
import Card from "../Components/Card";
import BuyToken from "../Components/BuyToken";
import WidthdrawToken from "../Components/WidthdrawToken";
import TokenTransfer from "../Components/TokenTransfer";

const index = () => {
  const {
    withdrawToken,
    transferTokens,
    buyToken,
    createIcoSale,
    getAllUserIcoSaleToken,
    getAllIcoSaleToken,
    createERC20,
    connectWallet,
    openBuyToken,
    setOpenBuyToken,
    openWithdrawToken,
    setOpenWithdrawToken,
    openTransferToken,
    setOpenTransferToken,
    openTokenCreator,
    setOpenTokenCreator,
    openCreateICO,
    setOpenCreateICO,
    address,
    setAddress,
    accountBalance,
    loader,
    setLoader,
    currency,
    PINATA_API_KEY,
    PINATA_SECRET_KEY,
    ICO_MARKETPLACE_ADDRESS,
    shortenAddress,
  } = useStateContext();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  // State
  const [allICOs, setAllICOs] = useState();
  const [allUserICOs, setAllUserICOs] = useState();

  // component state
  const [openAllIcos, setOpenAllIcos] = useState(false);
  const [openTokenHistory, setOpenTokenHistory] = useState(false);
  const [openICOMarketplace, setOpenICOMarketplace] = useState(false);

  // buy ico tokens
  const [buyICO, setBuyICO] = useState();

  const copyAddress = () => {
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
    notifySuccess("Address Copied successfully!");
  };

  return (
    <div>
      <Header
        accountBalance={accountBalance}
        setAddress={setAddress}
        address={address}
        connectWallet={connectWallet}
        ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
        shortenAddress={shortenAddress}
        setOpenAllIcos={setOpenAllIcos}
        openAllIcos={openAllIcos}
        setOpenTokenCreator={setOpenTokenCreator}
        openTokenCreator={openTokenCreator}
        setOpenTokenHistory={setOpenTokenHistory}
        openTokenHistory={openTokenHistory}
        setOpenICOMarketplace={setOpenICOMarketplace}
        openICOMarketplace={openICOMarketplace}
      />

      {openAllIcos && <ICOMarket />}
      {openTokenCreator && (
        <TokenCreator
          createERC20={createERC20}
          shortenAddress={shortenAddress}
          setOpenTokenCreator={setOpenTokenCreator}
          setLoader={setLoader}
          address={address}
          connectWallet={connectWallet}
          PINATA_API_KEY={PINATA_API_KEY}
          PINATA_SECRET_KEY={PINATA_SECRET_KEY}
        />
      )}
      {openTokenHistory && (
        <TokenHistory
          shortenAddress={shortenAddress}
          setOpenTokenHistory={setOpenTokenHistory}
        />
      )}
      {!openCreateICO && (
        <CreateICO
          shortenAddress={shortenAddress}
          setOpenCreateICO={setOpenCreateICO}
          connectWallet={connectWallet}
          address={address}
          createIcoSale={createIcoSale}
        />
      )}
      {openICOMarketplace && <ICOMarket />}
      {openBuyToken && <BuyToken />}
      {openTransferToken && <TokenTransfer />}
      {openWithdrawToken && <WidthdrawToken />}

      <Footer />
      {loader && <Loader />}
    </div>
  );
};

export default index;
