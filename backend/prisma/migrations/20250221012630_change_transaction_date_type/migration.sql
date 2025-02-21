-- AlterTable
ALTER TABLE "TransactionItem" ALTER COLUMN "transactionDate" DROP DEFAULT,
ALTER COLUMN "transactionDate" SET DATA TYPE TEXT;
