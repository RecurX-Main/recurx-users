"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  Send,
  QrCode,
  Search,
  ChevronDown,
  Globe,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "@/context/theme.context";

const Page = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("Polygon");
  const [searchQuery, setSearchQuery] = useState("");
  const { themeClasses } = useTheme();

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
                <span className="text-4xl font-bold text-gray-900">0.0</span>
                <span className="text-lg font-medium text-gray-600">MATIC</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">= $0.00 USD</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
                <QrCode className="w-4 h-4 mr-2" />
                Receive
              </Button>
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
                  <option value="Ethereum">Ethereum</option>
                  <option value="BSC">BSC</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">P</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">Polygon</h3>
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
              <Button className="px-8 bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
