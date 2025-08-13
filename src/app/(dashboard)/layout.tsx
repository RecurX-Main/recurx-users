"use client";
import React from "react";
import { AppSidebar } from "@/components/component/appSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/provider/theme.provider";
import { UpperHeader } from "@/components/component/upperNavBar";
import Chatbot from "@/components/component/chatbot";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <ThemeProvider>
            <UpperHeader />
            {children}
            <Chatbot />
          </ThemeProvider>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default layout;
