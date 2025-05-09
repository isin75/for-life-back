/*
  Warnings:

  - The `categories` column on the `saving_account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `category` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "saving_account" DROP COLUMN "categories",
ADD COLUMN     "categories" JSONB[] DEFAULT ARRAY[]::JSONB[];
