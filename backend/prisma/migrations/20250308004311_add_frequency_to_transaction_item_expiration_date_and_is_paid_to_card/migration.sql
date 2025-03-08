-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TransactionItem" ADD COLUMN     "frequency" TEXT NOT NULL DEFAULT 'variable';
