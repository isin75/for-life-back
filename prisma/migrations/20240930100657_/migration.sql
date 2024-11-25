/*
  Warnings:

  - Added the required column `month_year` to the `distribute_salary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "distribute_salary" ADD COLUMN     "month_year" TEXT NOT NULL;
