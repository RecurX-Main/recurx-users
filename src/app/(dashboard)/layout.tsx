"use client";
import React, { useEffect } from "react";
import { AppSidebar } from "@/components/component/appSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/provider/theme.provider";
import { UpperHeader } from "@/components/component/upperNavBar";
import Chatbot from "@/components/component/chatbot";
import { WalletProvider } from "@/provider/wallet.provider";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      router.push("/");
      return;
    }
  }, []);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <ThemeProvider>
            <WalletProvider>
              <UpperHeader />
              {children}
              <Chatbot />
            </WalletProvider>
          </ThemeProvider>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
