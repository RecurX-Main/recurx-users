import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WelcomeHeaderProps {
  userName?: string;
  userEmail?: string;
  userImage?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

// Simple version without
export function UpperHeader({
  userName = "Mani pal",
  userImage,
}: Pick<WelcomeHeaderProps, "userName" | "userImage">) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <header className="flex items-center justify-between w-full px-8 py-3 mt-[-1rem] bg-white">
      <div>
        <h1 className="text-xl font-medium text-gray-900">
          Welcome back, {userName}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={userImage}
            alt={userName}
            className="object-cover"
          />
          <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-900">{userName}</span>
      </div>
    </header>
  );
}
