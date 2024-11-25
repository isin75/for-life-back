-- AlterTable
ALTER TABLE "user" ADD COLUMN     "add_investments_or_repayment_of_debts_percent" DOUBLE PRECISION,
ADD COLUMN     "charity_and_gifts_percent" DOUBLE PRECISION,
ADD COLUMN     "deferred_goals_percent" DOUBLE PRECISION,
ADD COLUMN     "entertainment_and_personal_expenses_percent" DOUBLE PRECISION,
ADD COLUMN     "major_expenditures_percernt" DOUBLE PRECISION,
ADD COLUMN     "saving_and_investments_percent" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "distribute_salary" (
    "id" TEXT NOT NULL,
    "major_expenditures" DOUBLE PRECISION,
    "saving_and_investments" DOUBLE PRECISION,
    "deferred_goals" DOUBLE PRECISION,
    "entertainment_and_personal_expenses" DOUBLE PRECISION,
    "charity_and_gifts" DOUBLE PRECISION,
    "add_investments_or_repayment_of_debts" DOUBLE PRECISION,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "distribute_salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "picture" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "distribute_salary" ADD CONSTRAINT "distribute_salary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
