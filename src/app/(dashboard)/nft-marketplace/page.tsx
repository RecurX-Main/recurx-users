"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageOff, Clock } from "lucide-react";
import { useTheme } from "@/context/theme.context";

function ImageTile({ src, idx }: { src: string; idx: number }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="group relative">
      <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] w-full">
            {!loaded && !error && (
              <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-800" />
            )}

            {!error ? (
              <img
                src={src}
                alt={`Gallery item ${idx + 1}`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex items-center gap-2 text-slate-500">
                  <ImageOff className="h-5 w-5" />
                  <span className="text-sm">Image unavailable</span>
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <Badge className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-900 shadow backdrop-blur dark:bg-slate-900/80 dark:text-slate-100">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Coming Soon
                </span>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  const { themeClasses } = useTheme();
  const imgs = [
    "https://s3.dualstack.us-east-2.amazonaws.com/static.nft.chaingpt.dev/chain_icons/cronos-cover.webp",
    "https://static.nft.chaingpt.org/chain_icons/img(7).png-1738758709479.png",
    "https://static.nft.chaingpt.org/chain_icons/img(2).png-1738758543805.png",
    "https://static.nft.chaingpt.org/chain_icons/illustration(1).png-1738750789228.png",
    "https://static.nft.chaingpt.org/chain_icons/img(1).png-1737623029828.png",
  ];

  return (
    <div
      className={` ${themeClasses.backgroudPrimary}  mx-auto  px-4 py-8 md:py-12`}
    >
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="px-0 pb-6">
          <CardTitle className="text-2xl md:text-3xl">
            Featured Collections
          </CardTitle>
          <CardDescription className="max-w-2xl">
            A curated set of visuals. We’re polishing the experience — these
            items are on the way.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {imgs.map((src, index) => (
              <ImageTile key={src + index} src={src} idx={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
