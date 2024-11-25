/*
  Warnings:

  - Added the required column `debt_id` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "debt_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_debt_id_fkey" FOREIGN KEY ("debt_id") REFERENCES "debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
