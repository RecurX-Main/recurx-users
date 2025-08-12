import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Send } from "lucide-react";

const Page = () => {
  const socialPlatforms = [
    {
      id: "twitter",
      name: "Twitter",
      icon: Twitter,
      description: "Follow us for latest updates and announcements.",
      buttonText: "Connect on Twitter",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      description:
        "Connect with our team and stay informed about our progress.",
      buttonText: "Connect on LinkedIn",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: Send,
      description: "Join our active community for discussions and support.",
      buttonText: "Connect on Telegram",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  const handleConnect = (platform: string) => {
    // Handle connection logic here
    console.log(`Connecting to ${platform}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
            Claim Your Free Tokens
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Joins our community and receive exclusive tokens as part of our
            launch campaign. Complete simple tasks too increase your allocation
          </p>
        </div>

        {/* Social Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;

            return (
              <Card
                key={platform.id}
                className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-50 rounded-full">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {platform.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-8">
                    {platform.description}
                  </p>

                  {/* Connect Button */}
                  <Button
                    className={`w-full ${platform.buttonColor} text-white font-medium py-3 rounded-lg transition-colors duration-200`}
                    // onClick={() => handleConnect(platform.id)}
                  >
                    {platform.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Complete all tasks to maximize your token allocation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
