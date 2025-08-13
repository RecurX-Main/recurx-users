import { ReactNode } from "react";
import LowerHeader from "@/components/component/lowerNavbar";

function layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <LowerHeader
        header="Top User Leaderboard"
        para="Ranked by total points earned"
      />
      {children}
    </section>
  );
}

export default layout;
