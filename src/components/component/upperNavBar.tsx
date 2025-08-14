"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export function UpperHeader() {
  const { data: session } = useSession();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <header className="flex items-center justify-between w-full px-8 py-3 mt-[-1rem] bg-white shadow-md shadow-gray-200 rounded-3xl">
      <div>
        <h1 className="text-xl font-medium text-gray-900">
          Welcome back, {session?.user?.name}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={session?.user?.image || ""}
            alt={session?.user?.name || "profile"}
            className="object-cover"
          />
          <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
            {getInitials(session?.user?.name || "")}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-900">
          {session?.user?.name}
        </span>
      </div>
    </header>
  );
}
