"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/context/wallet.context";

export default function RecieveTokens() {
  const [open, setOpen] = useState(false);
  const qrRef = useRef(null);
  const {address} = useWallet();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
          <QrCode className="w-4 h-4 mr-2" />
          Receive
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm flex flex-col items-center gap-4">
        <DialogHeader>
          <DialogTitle>Wallet QR Code</DialogTitle>
        </DialogHeader>

        <QRCodeCanvas value={address ? address : ""} size={200} includeMargin />

        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">
            {address && address
              ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
              : "Connect Wallet"}
          </span>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
