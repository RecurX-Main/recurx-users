import React, { ReactNode } from "react";
import LowerHeader from "@/components/component/lowerNavbar";

function layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <LowerHeader
        header="Dashboard"
        para="Monitor and manage all your payments"
      />

      {children}
    </section>
  );
}

export default layout;
