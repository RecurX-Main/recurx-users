import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Add Wallet Adddress and points
export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    if (!data.wallet) {
      return NextResponse.json(
        { message: "Wallet Address Required" },
        { status: 402 }
      );
    }
    const isAddressExists = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!isAddressExists?.wallet || isAddressExists.wallet.length === 0) {
      await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          wallet: data.wallet,
          point: 500,
        },
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      const info = {
        address: isAddressExists.wallet,
        points: isAddressExists.point,
      };
      return NextResponse.json({ message: info }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAddressExists = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const info = {
      address: isAddressExists?.wallet,
      points: isAddressExists?.point,
    };

    return NextResponse.json({ message: info || "" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
