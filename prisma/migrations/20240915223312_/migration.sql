/*
  Warnings:

  - You are about to drop the column `days_worked` on the `salary` table. All the data in the column will be lost.
  - You are about to drop the column `daytime_hours` on the `salary` table. All the data in the column will be lost.
  - You are about to drop the column `disability_insurance` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `final_tax_base` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `health_insurance` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `income_tax` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `pension_insurance` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `salaryId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `sickness_insurance` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "salary" DROP COLUMN "days_worked",
DROP COLUMN "daytime_hours";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "disability_insurance",
DROP COLUMN "final_tax_base",
DROP COLUMN "health_insurance",
DROP COLUMN "income_tax",
DROP COLUMN "pension_insurance",
DROP COLUMN "salaryId",
DROP COLUMN "sickness_insurance",
ADD COLUMN     "disability_insurance_percent" INTEGER,
ADD COLUMN     "four_brigade_percent" INTEGER,
ADD COLUMN     "health_insurance_percent" INTEGER,
ADD COLUMN     "income_tax_percent" INTEGER,
ADD COLUMN     "minimum_rate" INTEGER,
ADD COLUMN     "pension_insurance_percent" INTEGER,
ADD COLUMN     "sickness_insurance_percent" INTEGER;
