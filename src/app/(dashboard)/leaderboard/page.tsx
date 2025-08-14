"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { useTheme } from "@/context/theme.context";
import { Button } from "@/components/ui/button"; // Assuming shadcn button

const Page = () => {
  const { themeClasses } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Smaller for demo

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/v1/leaderboard");
        const data = await res.json();
        if (res.ok && Array.isArray(data.message)) {
          setUsers(data.message);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range = [1];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (totalPages > 1) range.push(totalPages);
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    const rangeWithDots: (number | string)[] = [];
    let prev = 0;
    for (const page of uniqueRange) {
      if (page - prev > 1) rangeWithDots.push("...");
      rangeWithDots.push(page);
      prev = page;
    }
    return rangeWithDots;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRowBackground = (rank: number) => {
    return rank % 2 === 0 ? "bg-blue-50" : "bg-white";
  };

  if (loading) {
    return (
      <div className={`text-center ${themeClasses.backgroudPrimary} mt-10`}>
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 mt-10">{error}</div>;
  }

  if (users.length === 0) {
    return (
      <div
        className={`${themeClasses.backgroudPrimary} flex min-h-[60vh] w-full items-center justify-center rounded-lg`}
      >
        <h2 className="text-2xl font-semibold text-gray-600">
          🚀 No Leaderboard data yet
        </h2>
      </div>
    );
  }

  return (
    <div className={`${themeClasses.backgroudPrimary} min-h-screen`}>
      <div className="mx-auto p-5">
        <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-700">Rank</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700">User</h3>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-semibold text-gray-700">Points</h3>
                </div>
              </div>
            </div>

            {/* Leaderboard Entries */}
            <div className="divide-y divide-gray-100">
              {currentUsers.map((entry, index) => (
                <div
                  key={index}
                  className={`px-6 py-4 transition-colors hover:bg-blue-100 ${getRowBackground(
                    startIndex + index
                  )}`}
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        {getRankIcon(startIndex + index + 1)}
                        <span className="text-base font-medium text-gray-800">
                          {startIndex + index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-base font-medium text-gray-800">
                        {/* @ts-ignore */}
                        {entry?.name || ""}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-semibold text-gray-800">
                        {/* @ts-ignore */}
                        {entry?.point || ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            {getPaginationRange().map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-3 py-1 text-gray-500">
                  ...
                </span>
              ) : (
                <Button
                  key={i}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(Number(page))}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
