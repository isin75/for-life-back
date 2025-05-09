/*
  Warnings:

  - You are about to drop the column `budget_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the `SavingPlan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `salary_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "SavingPlan" DROP CONSTRAINT "SavingPlan_accountId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "budget_id",
ADD COLUMN     "salary_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "SavingPlan";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
