/*
  Warnings:

  - You are about to drop the `ExpenseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExpenseItem";

-- CreateTable
CREATE TABLE "TransactionItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "TransactionItem_pkey" PRIMARY KEY ("id")
);
