"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Search, ChevronDown, Globe, TrendingUp } from "lucide-react";
import { useTheme } from "@/context/theme.context";
import SendToken from "@/packages/ui/sendToken";
import RecieveTokens from "@/packages/ui/recievetoken";
import { fetchFunds } from "@/packages/libs/ether";
import { findUserWallet } from "@/handlers/handlers";

const Page = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("Polygon");
  const [searchQuery, setSearchQuery] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: null,
    address: null,
  });
  const { themeClasses } = useTheme();
  const [amount, setAmount] = useState("0");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function userFunds() {
      try {
        const info = await fetchFunds();
        setAmount(info);
      } catch (error) {
        console.log(error);
        setAmount("0");
      }
    }
    userFunds();
  }, []);

  async function findUser() {
    try {
      if (searchQuery.includes("@")) {
        setLoading(true);
        const res = await findUserWallet("email", searchQuery);
        setUserInfo({
          email: res.data.email,
          address: res.data.wallet,
        });
        setSearchQuery("");
        setLoading(false);
      } else {
        setLoading(true);
        const res = await findUserWallet("address", searchQuery);
        setUserInfo({
          email: res.data[0].email,
          address: res.data[0].wallet,
        });
        setSearchQuery("");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setUserInfo({
        email: "",
        address: "",
      });
      setSearchQuery("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`  ${themeClasses.backgroudPrimary} p-4 h-screen`}>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Balance Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Balance
                </h2>
                <p className="text-sm text-gray-500">Polygon Network</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {amount}
                </span>
                <span className="text-lg font-medium text-gray-600">MATIC</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">= $0.00 USD</span>
              </div>
            </div>

            <div className="flex gap-3">
              <SendToken address="" />
              <RecieveTokens />
            </div>
          </CardContent>
        </Card>

        {/* Network Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Network</h2>
            </div>

            <div className="mb-6">
              <div className="relative">
                <select
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg appearance-none text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                >
                  <option value="Polygon">Polygon</option>
                  <option value="yellow">Yellow</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div
                  className={`w-10 h-10 ${
                    selectedNetwork === "yellow"
                      ? "bg-yellow-500"
                      : "bg-purple-600"
                  } rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-semibold">
                    {" "}
                    {selectedNetwork === "yellow" ? "Y" : "P"}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">{selectedNetwork}</h3>
              <p className="text-sm text-gray-500">Your Network</p>
            </div>
          </CardContent>
        </Card>

        {/* Search Wallet Info Card */}
        <Card className="bg-white shadow-lg border-0 md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Search className="w-6 h-6 text-pink-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Search Wallet nfo
              </h2>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search email or wallet address"
                  className="pl-10 py-3 border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button
                disabled={searchQuery.length === 0 && loading}
                onClick={findUser}
                className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Searching.." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {userInfo.email != null && userInfo.email.length === 0 && (
          <div className="flex items-center gap-2 p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium shadow-sm w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 
           8-8 8 3.582 8 8zm-7-4a1 1 0 11-2 0 1 1 0 
           012 0zM9 9a1 1 0 000 2v3a1 1 0 001 
           1h.01a1 1 0 100-2H11V9a1 1 0 00-2 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>User not found</span>
          </div>
        )}

        {/* User info */}
        {userInfo.email && (
          <Card className="bg-white shadow-xl border border-gray-100 rounded-2xl md:col-span-2 hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col gap-4">
              {/* User Info Section */}
              <div className="flex items-center gap-4">
                {/* Avatar Circle */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                  {userInfo.email.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {userInfo.email}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {userInfo.address}
                  </p>
                </div>
              </div>

              {/* Action Section */}
              <div className="flex justify-end">
                <SendToken address={userInfo.address} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Page;
