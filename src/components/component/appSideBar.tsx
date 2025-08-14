"use client";

import {
  Calendar,
  Home,
  Settings,
  Users,
  CreditCard,
  Trophy,
  LogOut,
  Store,
  NewspaperIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Manage Payment",
    url: "/payment-management",
    icon: CreditCard,
  },
  {
    title: "Manage Subscription",
    url: "/subscription",
    icon: Calendar,
  },
  {
    title: "NFT Marketplace",
    url: "/nft-marketplace",
    icon: Store,
  },
  {
    title: "News",
    url: "/news",
    icon: NewspaperIcon,
  },
  {
    title: "Leader board",
    url: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Community",
    url: "/community",
    icon: Users,
  },
];

const bottomItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 bg-white rounded-4xl shadow-md shadow-gray-200">
      <SidebarContent className="flex flex-col justify-between h-full py-4">
        {/* Main Navigation */}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarContent>
              <img src="./image-light.png" alt="" className="w-36" />
            </SidebarContent>

            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
                        "hover:bg-gray-100",
                        isActive
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {bottomItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
                        "hover:bg-gray-100",
                        isActive
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 
             bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
