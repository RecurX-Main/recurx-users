"use client";
import React, { ReactNode } from "react";
import { useTheme } from "@/context/theme.context";

function layout({ children }: { children: ReactNode }) {
  const { themeClasses } = useTheme();

  return (
    <section className={`${themeClasses.backgroudPrimary} h-full`}>
      {children}
    </section>
  );
}

export default layout;
