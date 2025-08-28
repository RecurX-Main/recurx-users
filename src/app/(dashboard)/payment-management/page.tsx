"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Filter } from "lucide-react";
import { useTheme } from "@/context/theme.context";
import { useWallet } from "@/context/wallet.context";
import { findUsersTransactions } from "@/handlers/handlers";

const Page = () => {
  const { themeClasses } = useTheme();
  const { address } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Completed");
  const [dateRange, setDateRange] = useState("Date Range");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!address) {
      setTransactions([]);
      return;
    }
    findUsersTransactions(address).then((info) => {
      setTransactions(info.data || []);
    });
  }, [address]);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.transactionHash?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.toWalletAddress?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && tx.status === "1") ||
      (statusFilter === "Failed" && tx.status === "0") ||
      (statusFilter === "Pending" && tx.status === "Pending");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`min-h-screen ${themeClasses.backgroudPrimary} p-6`}>
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Title */}
              <h1 className="text-xl font-semibold text-gray-900">
                Recent Transactions
              </h1>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search transaction..."
                    className="pl-9 pr-4 py-2 w-full sm:w-64 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="All">All Status</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Date Range Filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="Date Range">Date Range</option>
                    <option value="Today">Today</option>
                    <option value="Last 7 days">Last 7 days</option>
                    <option value="Last 30 days">Last 30 days</option>
                    <option value="Last 90 days">Last 90 days</option>
                    <option value="Custom">Custom Range</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Transaction Hash
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Wallet Address
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Network
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {transaction.transcationHash?.slice(0, 10)}...
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {transaction.toWalletAddress?.slice(0, 10)}...
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {transaction.amount}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {transaction.network}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === "1"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status === "1"
                              ? "Success"
                              : transaction.status === "Pending"
                              ? "Pending"
                              : "Failed"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {transaction.createdAt}
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No transactions found
                        </h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                          There are no transactions matching your current
                          filters. Try adjusting your search criteria.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
