"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, HelpCircle, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    setMounted(true);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-slate-400">
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <Image
          src="/login_bg.svg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 12 Column Grid */}
      <div className="relative z-10 grid grid-cols-12 min-h-screen">
        {/* Left Side (9 columns) */}
        <div className="col-span-12 md:col-span-8 flex flex-col  items-center md:items-center lg:items-start justify-center px-8 md:px-16 py-10  order-2 md:order-1">
          {/* Logo + Name */}
          <div className="mb-8 flex items-center gap-3">
            <Image
              src="/RecurX_logo.png"
              alt="RecurX Logo"
              width={50}
              height={50}
              className="h-auto w-auto"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              RecurX
            </h1>
          </div>
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            <span className="text-yellow-400">
              Decentralized Payment Solution
            </span>
          </h2>
          {/* Short Description */}
          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            Empowering businesses with secure, fast, and transparent payments.
          </p>
          {/* Features */}
          <div className="mt-6 flex flex-wrap gap-4 text-gray-100">
            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-400 h-5 w-5" />
              Easy Payment Methods
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-400 h-5 w-5" />
              Easy Integration
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-400 h-5 w-5" />
              Powerful Dashboard
            </p>
          </div>
        </div>

        {/* Right Side (3 columns) */}
     {/* Right Side (3 columns) */}
<div className="col-span-12 md:col-span-4 flex items-start md:items-center justify-center md:justify-center p-2 lg:mr-5 ml-3 order-1 md:order-2 lg:mt-0 mt-6">
  <Card className="w-full max-w-md shadow-2xl border border-blue-500/30 bg-white backdrop-blur-sm mr-4 md:mr-0 lg:p-6 p-2">
    {/* Logo + Name inside the card */}
    <div className="flex items-center gap-3 lg:mb-2 p-3 m-2 mt-2 bg-black rounded-md justify-center">
      <Image
        src="/RecurX_logo.png"
        alt="RecurX Logo"
        width={40}
        height={40}
        className="h-auto w-auto"
      />
      <h1 className="text-2xl font-bold text-white">Welcome to RecurX</h1>
    </div>

    <CardHeader className="text-center text-black">
      <CardTitle className="text-2xl text-black">Get Started</CardTitle>
      <CardDescription className="text-black-100">
        Access your Decentralized Payment Solution
      </CardDescription>
    </CardHeader>

    <CardContent className="lg:p-2 p-2 mb-2 space-y-4">
      {error === "OAuthAccountNotLinked" && (
        <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
          This Google account is not linked to a RecurX account. Please
          use a different account or contact support.
        </p>
      )}
 <Button
  onClick={() => {
    signIn("google", { callbackUrl: "/dashboard" });
  }}
  className="w-full text-black border p-7 border-gray-300 bg-white hover:bg-blue-100 cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:border-blue-400/60"
  variant="outline"
>
  <Image
    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
    alt="Google"
    width={20}
    height={20}
    className="h-5 w-5"
  />
  Get Started with Google
</Button>

    </CardContent>

 <div className="lg:px-12 py-3 border-t border-blue-400/20 text-xs text-center text-black-400">
  By signing in, 
   you agree to our <span className="text-blue-500"> Terms of Service</span> and <span className="text-blue-500"> Privacy Policy</span>  
</div>


    <p className="lg:mt-3 mt-0 text-sm text-center text-black px-6 pb-6">
      Need help?{" "}
      <a
        href="/contact"
        className="text-blue-500 hover:text-blue-300 hover:underline inline-flex items-center transition-colors duration-200"
      >
        Contact support <HelpCircle size={12} className="ml-1" />
      </a>
    </p>
  </Card>
</div>


      </div>
    </div>
  );
}
