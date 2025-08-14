"use client";
import React, { useEffect, useState } from "react";
import { walletContext as WalletContext } from "@/context/wallet.context";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState("");

  // Function to save address
  const useAddress = (ad: string) => {
    sessionStorage.setItem("address", JSON.stringify(ad));
    setAddress(ad);
  };

  useEffect(() => {
    const userAddress = window.sessionStorage.getItem("address");
    if (typeof userAddress === undefined) {
      setAddress("");
      return;
    }
    if (userAddress && typeof userAddress != undefined) {
      setAddress(JSON.parse(userAddress) || "");
    }
  }, []);

  const disConnectWallet  = ()=>{
    const userAddress = sessionStorage.getItem('address')
    if(userAddress && typeof userAddress != undefined){
      sessionStorage.removeItem('address')
      return
    }
  }

  const value = {
    address,
    useAddress,
    disConnectWallet
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
