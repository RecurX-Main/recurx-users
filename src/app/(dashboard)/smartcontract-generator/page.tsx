"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateSmartContract } from "@/handlers/handlers";
import Markdown from "@/components/component/markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

function Page() {
  const [info, setInfo] = useState({
    data: "",
    loading: false,
    error: "",
    result: "",
  });
  async function messageHandler(message: string) {
    try {
      setInfo({
        ...info,
        loading: true,
      });
      const response = await generateSmartContract(message);
      if (!response) {
        setInfo({
          ...info,
          error: "Something went wrong",
        });
      }
      setInfo({
        ...info,
        loading: false,
        result: response?.message?.data.bot,
      });
    } catch (error: any) {
      setInfo({
        ...info,
        error: error,
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-between h-[50rem] overflow-x-hidden relative">
      <div className="max-w-6xl">
        {info.loading ? (
          <>
            <Skeleton className="h-[40rem] w-[60rem] rounded-3xl animate-pulse"></Skeleton>
          </>
        ) : (
          <>{info.result && <Markdown content={info.result} />}</>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-6 fixed  bottom-0 mb-3 ">
        <Textarea
          onChange={(e) =>
            setInfo({
              ...info,
              data: e.target.value,
            })
          }
          placeholder="Create a smart contract for nft marketplace"
          className="w-[50rem]"
        />

        {info.loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
          </>
        ) : (
          <Button onClick={() => messageHandler(info.data)}>
            Generate the contract
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
