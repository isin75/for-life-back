/*
  Warnings:

  - You are about to drop the column `user_id` on the `distribute_salary` table. All the data in the column will be lost.
  - You are about to drop the column `add_investments_or_repayment_of_debts_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `charity_and_gifts_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deferred_goals_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `entertainment_and_personal_expenses_percent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `is_weekly_expenses` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `major_expenditures_percernt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `on_the_first_goal` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `salary_settings_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `saving_and_investments_percent` on the `user` table. All the data in the column will be lost.
  - Added the required column `left` to the `distribute_salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_settings` to the `distribute_salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `distribute_salary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "distribute_salary" DROP CONSTRAINT "distribute_salary_user_id_fkey";

-- DropIndex
DROP INDEX "user_salary_settings_id_key";

-- AlterTable
ALTER TABLE "distribute_salary" DROP COLUMN "user_id",
ADD COLUMN     "left" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "salary_settings" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "add_investments_or_repayment_of_debts_percent",
DROP COLUMN "charity_and_gifts_percent",
DROP COLUMN "deferred_goals_percent",
DROP COLUMN "entertainment_and_personal_expenses_percent",
DROP COLUMN "is_weekly_expenses",
DROP COLUMN "major_expenditures_percernt",
DROP COLUMN "on_the_first_goal",
DROP COLUMN "salary_settings_id",
DROP COLUMN "saving_and_investments_percent";

-- CreateTable
CREATE TABLE "distribute_settings" (
    "id" TEXT NOT NULL,
    "major_expenditures_percernt" DOUBLE PRECISION,
    "saving_and_investments_percent" DOUBLE PRECISION,
    "deferred_goals_percent" DOUBLE PRECISION,
    "entertainment_and_personal_expenses_percent" DOUBLE PRECISION,
    "charity_and_gifts_percent" DOUBLE PRECISION,
    "add_investments_or_repayment_of_debts_percent" DOUBLE PRECISION,
    "on_the_first_goal" BOOLEAN NOT NULL DEFAULT true,
    "is_weekly_expenses" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "distribute_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalsSettings" (
    "id" TEXT NOT NULL,
    "total_save" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "for_a_rany_day" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "undistributed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percent_on_goals" JSONB,

    CONSTRAINT "GoalsSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "distribute_settings" ADD CONSTRAINT "distribute_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distribute_salary" ADD CONSTRAINT "distribute_salary_salary_settings_fkey" FOREIGN KEY ("salary_settings") REFERENCES "distribute_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
