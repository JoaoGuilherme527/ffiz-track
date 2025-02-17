/*
  Warnings:

  - Added the required column `type` to the `ExpenseItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseItem" ADD COLUMN     "type" TEXT NOT NULL;
