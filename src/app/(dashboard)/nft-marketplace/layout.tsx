import React from "react";
import LowerHeader from "@/components/component/lowerNavbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <LowerHeader
        header="NFT MarketPlace"
        para="Manage and Create your own digital assests"
      />
      {children}
    </section>
  );
}

export default layout;
