/*
  Warnings:

  - Added the required column `is_completed` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percent_compiled` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "distribute_salary" ADD COLUMN     "weekly_expenses" JSONB;

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "compiled" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "is_completed" BOOLEAN NOT NULL,
ADD COLUMN     "percent_compiled" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "percent_on_target" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "on_the_first_goal" BOOLEAN NOT NULL DEFAULT true;
