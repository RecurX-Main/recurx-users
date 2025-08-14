"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWallet } from "@/context/wallet.context";
import { connectWallet } from "../libs/ether";
import { connectWalletHandler } from "@/handlers/handlers";

function WalletProvider() {
  const { useAddress, address,disConnectWallet } = useWallet();
  const [isConnect, setIsConnected] = useState(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    }
  }, [address]);

  const handleWalletConnect = async (walletName: string) => {
    try {
      let ad: string = "";
      if (walletName === "MetaMask") {
        ad = (await connectWallet()) as string;
        if (ad) {
          await connectWalletHandler(ad);
        }
        setIsConnected(true);
        useAddress(ad);
      }
    } catch (err) {
      console.error("Wallet connect failed:", err);
    }
  };

  const handleRemoveWallet = ()=>{
        disConnectWallet()
        setIsConnected(false)
  }

  if (isConnect) {
    return (
      <>
        <button onClick={handleRemoveWallet} className="bg-[#1093FF] py-2 px-4 text-white  rounded-3xl">
            Disconnect Wallet
        </button>
      </>
    );
  }

  return (
    <div className={`flex items-center justify-center`}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="px-6 py-3">
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>
              Choose a wallet provider to connect to your account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <Card className="cursor-pointer transition-colors p-1">
              <CardContent className="p-4">
                <div
                  className="flex items-center gap-4"
                  onClick={() => handleWalletConnect("MetaMask")}
                >
                  <img
                    className="w-12 h-12 rounded-lg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s"
                    alt="MetaMask"
                  />
                  <div>
                    <h3 className="font-semibold">MetaMask</h3>
                    <p className="text-sm text-gray-600">
                      Connect using MetaMask wallet
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer  transition-colors p-1">
              <CardContent className="p-4">
                <div
                  className="flex items-center gap-4"
                  //   onClick={() => handleWalletConnect("Stellar")}
                >
                  <img
                    className="w-12 h-12 rounded-lg"
                    src="https://avatars.githubusercontent.com/u/7386716?s=280&v=4"
                    alt="Stellar"
                  />
                  <div>
                    <h3 className="font-semibold">Stellar</h3>
                    <p className="text-sm text-gray-600">
                      Connect using Stellar wallet
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="text-center mt-5">Powered by Recurx</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WalletProvider;
