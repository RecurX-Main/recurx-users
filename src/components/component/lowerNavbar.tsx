"use client";
import { Button } from "../ui/button";
import { useTheme } from "@/context/theme.context";

function LowerHeader({ header, para }: { header: string; para: string }) {
  const { themeClasses } = useTheme();
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
            <Button>Connect Wallet</Button>
            <div>500 Points</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LowerHeader;
