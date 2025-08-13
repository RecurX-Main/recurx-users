import React from "react";
import LowerHeader from "@/components/component/lowerNavbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <LowerHeader header="" para="" />
      {children}
    </section>
  );
}

export default layout;
