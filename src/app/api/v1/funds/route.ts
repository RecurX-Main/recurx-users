import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 405 });
    }
    const data = await request.json();
    const { info, type } = data;
    if (!info || !type) {
      return NextResponse.json(
        { message: "Type and Info is required" },
        { status: 402 }
      );
    }

    if (type === "address") {
      const address = await prisma.user.findFirst({
        where: {
          wallet: info,
        },
      });
      if (!address) {
        return NextResponse.json(
          { message: "Address Not Found" },
          { status: 404 }
        );
      }
      const data = {
        email: address.email,
        wallet: address.wallet,
      };

      return NextResponse.json({ message: data }, { status: 200 });
    }

    if (type === "email") {
      const email = await prisma.user.findUnique({
        where: {
          email: info,
        },
      });
      if (!email) {
        return NextResponse.json(
          { message: "Email Not Found" },
          { status: 404 }
        );
      }
      const data = {
        email: email.email,
        wallet: email.wallet,
      };
      return NextResponse.json({ message: data }, { status: 200 });
    }
  } catch (error) {}
};
