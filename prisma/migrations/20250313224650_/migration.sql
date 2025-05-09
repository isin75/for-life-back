/*
  Warnings:

  - Added the required column `date` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "savedPrefMonth" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "saving_account" ADD COLUMN     "categories" JSONB NOT NULL DEFAULT '{}';
