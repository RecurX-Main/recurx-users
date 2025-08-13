'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { useTheme } from "@/context/theme.context";

const Page = () => {
  const { themeClasses } = useTheme();

  const leaderboardData = [
    { rank: 1, user: "Sanya Malhotra", points: 50, position: "1st" },
    { rank: 2, user: "Sanya Malhotra", points: 50, position: "2nd" },
    { rank: 3, user: "Sanya Malhotra", points: 50, position: "3rd" },
    { rank: 4, user: "Sanya Malhotra", points: 50, position: "4th" },
    { rank: 5, user: "Sanya Malhotra", points: 50, position: "5th" },
    { rank: 6, user: "Sanya Malhotra", points: 50, position: "6th" },
    { rank: 7, user: "Sanya Malhotra", points: 50, position: "7th" },
    { rank: 8, user: "Sanya Malhotra", points: 50, position: "8th" },
    { rank: 9, user: "Sanya Malhotra", points: 50, position: "9th" },
    { rank: 10, user: "Sanya Malhotra", points: 50, position: "10th" },
    { rank: 11, user: "Sanya Malhotra", points: 50, position: "11th" },
    { rank: 12, user: "Sanya Malhotra", points: 50, position: "12th" },
    { rank: 13, user: "Sanya Malhotra", points: 50, position: "13th" },
  ];

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

  return (
    <div className={`${themeClasses.backgroudPrimary}`}>
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
                  <h3 className="text-lg font-semibold text-gray-700">
                    Points
                  </h3>
                </div>
              </div>
            </div>

            {/* Leaderboard Entries */}
            <div className="divide-y divide-gray-100">
              {leaderboardData.map((entry, index) => (
                <div
                  key={index}
                  className={`px-6 py-4 transition-colors hover:bg-blue-100 ${getRowBackground(
                    entry.rank
                  )}`}
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    {/* Rank Column */}
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <span className="text-base font-medium text-gray-800">
                          {entry.position}
                        </span>
                      </div>
                    </div>

                    {/* User Column */}
                    <div className="text-center">
                      <span className="text-base font-medium text-gray-800">
                        {entry.user}
                      </span>
                    </div>

                    {/* Points Column */}
                    <div className="text-right">
                      <span className="text-base font-semibold text-gray-800">
                        {entry.points}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
