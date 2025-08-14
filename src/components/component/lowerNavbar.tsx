"use client";
import { useTheme } from "@/context/theme.context";
import WalletProvider from "@/packages/ui/wallet";
import { useEffect, useState } from "react";
import { fetchWalletInfo } from "@/handlers/handlers";

function LowerHeader({ header, para }: { header: string; para: string }) {
  const { themeClasses } = useTheme();
  const [points, setPoints] = useState("");
 useEffect(() => {
  (async function fetchInfo() {
    try {
      const response = await fetchWalletInfo();
      const data = await response;
      // useAddress(data.message.address);
      setPoints(data.message.points);
    } catch (error) {
      console.error(error);
    }
  })();
}, []);


  return (
    <nav
      className={`px-10 py-4 outline-0 border-0 shadow-none ${themeClasses.backgroudPrimary}`}
    >
      <div className="relative flex flex-row items-center justify-between bg-transparent">
        <div>
          <h2 className="text-4xl font-semibold">{header}</h2>
          <p className="text-lg font-light">{para}</p>
        </div>
        <div>
          <div className="flex flex-row items-center justify-center gap-9">
            <WalletProvider  />
            <div className="bg-[#1093FF] text-white py-2 px-4 rounded-2xl">
              {points} 
              {" "}Points
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LowerHeader;
