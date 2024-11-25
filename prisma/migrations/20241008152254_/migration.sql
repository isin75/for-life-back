/*
  Warnings:

  - You are about to drop the column `user_id` on the `salary` table. All the data in the column will be lost.
  - You are about to drop the column `bonuses` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `disability_insurance_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `four_brigade_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `health_insurance_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `income_tax_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `minimum_rate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `night_time_rate_of_pay` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `pension_insurance_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `rate_of_pay` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `revenue_expenditure` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `sickness_insurance_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `tax_benefit` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `total_salary` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `total_tax` on the `user` table. All the data in the column will be lost.
  - Added the required column `month_year` to the `salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_settings` to the `salary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "salary" DROP CONSTRAINT "salary_user_id_fkey";

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "left" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "salary" DROP COLUMN "user_id",
ADD COLUMN     "month_year" TEXT NOT NULL,
ADD COLUMN     "salary_settings" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bonuses",
DROP COLUMN "disability_insurance_percent",
DROP COLUMN "four_brigade_percent",
DROP COLUMN "health_insurance_percent",
DROP COLUMN "income_tax_percent",
DROP COLUMN "minimum_rate",
DROP COLUMN "night_time_rate_of_pay",
DROP COLUMN "pension_insurance_percent",
DROP COLUMN "rate_of_pay",
DROP COLUMN "revenue_expenditure",
DROP COLUMN "sickness_insurance_percent",
DROP COLUMN "tax_benefit",
DROP COLUMN "total_salary",
DROP COLUMN "total_tax",
ADD COLUMN     "total_debt" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "salary_settings" (
    "id" TEXT NOT NULL,
    "rate_of_pay" DOUBLE PRECISION,
    "minimum_rate" DOUBLE PRECISION,
    "night_time_rate_of_pay" DOUBLE PRECISION,
    "bonuses" JSONB,
    "tax_benefit" DOUBLE PRECISION,
    "pension_insurance_percent" DOUBLE PRECISION,
    "disability_insurance_percent" DOUBLE PRECISION,
    "sickness_insurance_percent" DOUBLE PRECISION,
    "income_tax_percent" DOUBLE PRECISION,
    "health_insurance_percent" DOUBLE PRECISION,
    "revenue_expenditure" DOUBLE PRECISION,
    "four_brigade_percent" DOUBLE PRECISION,
    "total_salary" DOUBLE PRECISION,
    "total_tax" DOUBLE PRECISION,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "salary_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "refunded_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "left" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 1,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "debt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "salary_settings" ADD CONSTRAINT "salary_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary" ADD CONSTRAINT "salary_salary_settings_fkey" FOREIGN KEY ("salary_settings") REFERENCES "salary_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt" ADD CONSTRAINT "debt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
