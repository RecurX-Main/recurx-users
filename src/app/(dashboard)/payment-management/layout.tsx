import React from "react";
import LowerHeader from "@/components/component/lowerNavbar";

function layout({ children }: { children: string }) {
  return (
    <section>
      <LowerHeader 
        header="Payment Mangement"
        para="Monitor and manage all your  payments"
      />
      {children}
    </section>
  );
}

export default layout;
