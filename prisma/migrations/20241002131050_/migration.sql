/*
  Warnings:

  - The `weekly_expenses` column on the `distribute_salary` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "distribute_salary" DROP COLUMN "weekly_expenses",
ADD COLUMN     "weekly_expenses" JSONB[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "is_weekly_expenses" BOOLEAN NOT NULL DEFAULT false;
