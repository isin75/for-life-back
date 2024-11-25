/*
  Warnings:

  - Added the required column `salaryId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bonuses" JSONB,
ADD COLUMN     "disability_insurance" INTEGER,
ADD COLUMN     "final_tax_base" INTEGER,
ADD COLUMN     "health_insurance" INTEGER,
ADD COLUMN     "income_tax" INTEGER,
ADD COLUMN     "night_time_rate_of_pay" INTEGER,
ADD COLUMN     "pension_insurance" INTEGER,
ADD COLUMN     "rate_of_pay" INTEGER,
ADD COLUMN     "revenue_expenditure" INTEGER,
ADD COLUMN     "salaryId" TEXT NOT NULL,
ADD COLUMN     "sickness_insurance" INTEGER,
ADD COLUMN     "tax_benefit" INTEGER,
ADD COLUMN     "total_salary" INTEGER,
ADD COLUMN     "total_tax" INTEGER;

-- CreateTable
CREATE TABLE "salary" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "days_worked" INTEGER,
    "hours_worked" INTEGER,
    "daytime_hours" INTEGER,
    "night_hours" INTEGER,
    "salary_gross" INTEGER NOT NULL,
    "salary_netto" INTEGER NOT NULL,
    "pension_insurance" INTEGER NOT NULL,
    "disability_insurance" INTEGER NOT NULL,
    "sickness_insurance" INTEGER NOT NULL,
    "social_insurance_total" INTEGER NOT NULL,
    "income_tax" INTEGER NOT NULL,
    "health_insurance" INTEGER NOT NULL,
    "final_tax_base" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "salary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "salary" ADD CONSTRAINT "salary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
