import { SmartContractGenerator } from "@chaingpt/smartcontractgenerator";
import { NextRequest, NextResponse } from "next/server";

// Initialize the SmartContractGenerator SDK client
const smartcontractgenerator = new SmartContractGenerator({
  apiKey: process.env.CHAINGPT_KEY!,
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json({ message: "No Info" }, { status: 403 });
    }

    const response = await smartcontractgenerator.createSmartContractBlob({
      question: data,
      chatHistory: "off",
    });

    if (!response) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ message: response.data.bot }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
