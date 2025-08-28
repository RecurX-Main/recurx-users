import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await request.json();
    const {
      transactionHash,
      fromAddress,
      toAddress,
      token,
      amount,
      network,
      status,
    } = await data;
    if (
      !transactionHash ||
      !fromAddress ||
      !toAddress ||
      !token ||
      !amount ||
      !network ||
      !status
    ) {
      return NextResponse.json(
        { message: "All field are required" },
        { status: 403 }
      );
    }

    await prisma.transcations.create({
      data: {
        fromWalletAddress: fromAddress,
        toWalletAddress: toAddress,
        network: network,
        token: token,
        transcationHash: transactionHash,
        status: status,
        amount: amount,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    if (!address) {
      return NextResponse.json(
        { message: "Wallet Address is required" },
        { status: 402 }
      );
    }
    const transcation = await prisma.transcations.findMany({
      where: {
        fromWalletAddress: address,
      },
    });
    return NextResponse.json(
      { message: "Success", data: transcation },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
};
