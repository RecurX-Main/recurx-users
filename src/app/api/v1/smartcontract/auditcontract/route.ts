import { SmartContractAuditor } from "@chaingpt/smartcontractauditor";
import { NextResponse, NextRequest } from "next/server";

// Initialize the SDK client with your ChainGPT API key
const smartcontractauditor = new SmartContractAuditor({
  apiKey: process.env.CHAINGPT_KEY!,
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 404 }
      );
    }

    const response = await smartcontractauditor.auditSmartContractBlob({
      question: `Audit the follwing contract.  ${data}`,
      chatHistory: "off",
    });

    if (!response) {
      return NextResponse.json({ message: "Server error" }, { status: 402 });
    }

    return NextResponse.json({ message: response.data.bot }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
