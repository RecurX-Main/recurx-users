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

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toggleTheme, themeClasses, isDark } = useTheme();

  useEffect(() => {
    setDarkMode(isDark);
  }, [darkMode]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("27ebd9d3u3rfu8rj3893e3bhjsrnhj3rr488...");
  };

  const handleConnectWallet = (walletType: string) => {
    console.log(`Connecting ${walletType} wallet`);
  };

  return (
    <div className=" p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <Card
          className={`${themeClasses.backgroudPrimary} border-0 shadow-none`}
        >
          <CardContent className="">
            <div className={`grid grid-cols-2 gap-10  `}>
              {/* Profile Info */}
              <div className="flex-1 bg-white p-6 ">
                <div className="flex flex-col items-start gap-4">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src="/api/placeholder/64/64"
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>

                  {/* User Details */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        Mani Pal
                      </p>
                    </div>

                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        Email
                      </label>
                      <p className="text-gray-900">ManiPal12@gmail.com</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        Wallet Address
                      </label>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 font-mono text-sm">
                          27ebd9d3u3rfu8rj3893e3bhjsrnhj3rr488...
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyAddress}
                          className="p-1 h-auto"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              <div className="md:w-80 ">
                {/* Dark Theme Toggle */}
                <div className="flex items-center justify-between mb-6 bg-white p-6">
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-600" />
                    )}
                    <span className="text-gray-900 font-medium">
                      Dark Theme
                    </span>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                      darkMode ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      setDarkMode(!darkMode);
                      toggleTheme();
                    }}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${
                        darkMode ? "translate-x-6 ml-0.5" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3 bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      Quick Actions
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left p-3 h-auto hover:bg-blue-50 bg-blue-500"
                  >
                    <span className="text-black">View Transaction</span>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left p-3 h-auto hover:bg-blue-50 bg-blue-500"
                  >
                    <span className="text-black">Security Settings</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Management Section */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-blue-600" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Wallet Management
                  </h2>
                  <p className="text-sm text-gray-600">
                    Connect and manage your crypto wallets
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Create a new wallet
              </Button>
            </div>

            {/* Wallet Connection Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Connect Wallet */}
              <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Link className="w-8 h-8 mx-auto text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Connect Wallet
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnectWallet("generic")}
                  >
                    Connect your wallet to continue
                  </Button>
                </CardContent>
              </Card>

              {/* Connect Massa Wallet */}
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded mx-auto flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Connect Massa Wallet
                  </h3>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                    onClick={() => handleConnectWallet("massa")}
                  >
                    Connect wallet
                  </Button>
                </CardContent>
              </Card>

              {/* Connect Stellar Wallet */}
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded mx-auto flex items-center justify-center">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Connect Stellar Wallet
                  </h3>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                    onClick={() => handleConnectWallet("stellar")}
                  >
                    Connect wallet
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
