-- CreateTable
CREATE TABLE "public"."Transcations" (
    "id" TEXT NOT NULL,
    "toWalletAddress" TEXT NOT NULL,
    "fromWalletAddress" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "transcationHash" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transcations_pkey" PRIMARY KEY ("id")
);
