"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Settings,
  ExternalLink,
  ChevronRight,
  Copy,
  Wallet,
  Plus,
  Link,
} from "lucide-react";
import { useTheme } from "@/context/theme.context";
import { useSession } from "next-auth/react";
import { useWallet } from "@/context/wallet.context";


const Page = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toggleTheme, themeClasses, isDark } = useTheme();
  const {data:session} = useSession()
  const {address} = useWallet();

  useEffect(() => {
    setDarkMode(isDark);
  }, [isDark]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address as string);
  };

  const handleConnectWallet = (walletType: string) => {
    console.log(`Connecting ${walletType} wallet`);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <Card className={`${themeClasses.backgroudPrimary} border-0 outline-0 shadow-sm rounded-lg`}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Profile Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-start gap-4">
                  {/* Profile Image */}
                  <img
                    src={session?.user?.image || ""}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* User Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-lg font-semibold text-gray-900">{session?.user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{session?.user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Wallet Address</label>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 font-mono text-sm truncate max-w-[200px]">
                          {address ? address?.slice(0,15) + "...." : "connect Wallet"}
                        </p>
                        {address && <Button variant="ghost" size="sm" onClick={handleCopyAddress}>
                          <Copy className="w-4 h-4 text-gray-500" />
                        </Button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              <div className="space-y-6">
                {/* Dark Theme Toggle */}
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <span className="font-medium">Dark Theme</span>
                  </div>
                  <div
                    // onClick={() => { setDarkMode(!darkMode); toggleTheme(); }}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${darkMode ? "bg-blue-500" : "bg-gray-300"}`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${darkMode ? "translate-x-6" : ""}`}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Quick Actions</span>
                  </div>
                  <Button variant="outline" className="w-full justify-between">
                    View Transaction <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between mt-2">
                    Security Settings <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Management Section */}
        <Card className="bg-white shadow-sm border-0 rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-blue-600" />
                <div>
                  <h2 className="text-xl font-semibold">Wallet Management</h2>
                  <p className="text-sm text-gray-600">Connect and manage your crypto wallets</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Create a new wallet
              </Button>
            </div>

            {/* Wallet Connection Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-dashed hover:border-blue-400 transition rounded-lg">
                <CardContent className="p-6 text-center">
                  <Link className="w-8 h-8 mx-auto text-gray-400 mb-4" />
                  <h3 className="font-medium mb-2">Connect Wallet</h3>
                  <Button variant="outline" size="sm" onClick={() => handleConnectWallet("generic")}>
                    Connect your wallet to continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
