"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { TrendingUp, Send } from "lucide-react";
import { sendToken } from "../libs/ether";
// import { sendToken, sendTokenMassa } from "../lib/payment";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function SendToken({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [blockchain, setBlockchain] = useState("polygon");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      setToAddress(address);
    }
  }, [address]);

  const handleSend = async () => {
    if (!toAddress || !amount || !blockchain) {
      alert("Please complete all fields");
      return;
    }
    try {
      setLoading(true);
      if (blockchain === "polygon") {
        await sendToken(toAddress, parseFloat(amount));
        toast("Successfully Funds transfer");
        setOpen(false);
      }
      setToAddress("");
      setAmount("");
    } catch (err) {
      console.error(err);
      toast("Failed to transfer the funds");
    } finally {
      setLoading(false);
    }
  };

  // if (!authenticated) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <div className="grid gap-4 py-4">
          <div>
            <label className="text-sm font-medium">To Address</label>
            <Input
              placeholder="0xRecipientAddress"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input
              placeholder="10"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Blockchain</label>
            <Select value={blockchain} onValueChange={setBlockchain}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Blockchain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="massa">Massa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSend}
            disabled={loading || !toAddress || !amount}
          >
            {loading ? "Sending..." : "Send Token"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
