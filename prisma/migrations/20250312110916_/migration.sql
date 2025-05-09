/*
  Warnings:

  - Added the required column `action` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentSaved` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difference` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'NONE');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "action" "ActionType" NOT NULL,
ADD COLUMN     "currentSaved" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "difference" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "requiredAmount" DECIMAL(65,30) NOT NULL;
