"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Users,
  CreditCard,
  Trophy,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    icon: Calendar,
  },
  {
    title: "News",
    url: "/news",
    icon: Calendar,
  },
  {
    title: "Smart Contract Generator",
    url: "/smartcontract-generator",
    icon: Calendar,
  },
  {
    title: "Smart Contract Audit",
    url: "/smartcontract-audit",
    icon: Calendar,
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
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent className="flex flex-col justify-between h-full py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
