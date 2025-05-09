/*
  Warnings:

  - You are about to drop the `Electric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('MONTHLY', 'QUARTERLY', 'YEARLY', 'ONE_TIME');

-- DropForeignKey
ALTER TABLE "Electric" DROP CONSTRAINT "Electric_rent_settings_id_fkey";

-- AlterTable
ALTER TABLE "gas" ALTER COLUMN "gas_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "rent_settings" ALTER COLUMN "gas_subscription_fee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gas_conversion_rate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gas_consumption_price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gas_distribution_fixed" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gas_distributive_variable_price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_cogeneration_fee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_fixed_component" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_fixed_rate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_kilowatt_price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_network_speed" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_quality_rate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_subscription_rate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_transfer_fee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electric_OZE" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Electric";

-- DropTable
DROP TABLE "Rent";

-- CreateTable
CREATE TABLE "electric" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "electric_consumption" INTEGER NOT NULL,
    "electric_price" DOUBLE PRECISION NOT NULL,
    "rent_settings_id" TEXT NOT NULL,

    CONSTRAINT "electric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rent" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "heating" JSONB NOT NULL,
    "water" JSONB NOT NULL,
    "rent_settings_id" TEXT NOT NULL,

    CONSTRAINT "rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saving_account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saving_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavingPlan" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "targetAmount" DECIMAL(65,30) NOT NULL,
    "savedAmount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "deadline" TIMESTAMP(3) NOT NULL,
    "isPartial" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "savedAmount" DECIMAL(65,30),
    "frequency" "Frequency" NOT NULL,
    "deadline" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "saving_account_userId_key" ON "saving_account"("userId");

-- AddForeignKey
ALTER TABLE "electric" ADD CONSTRAINT "electric_rent_settings_id_fkey" FOREIGN KEY ("rent_settings_id") REFERENCES "rent_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_rent_settings_id_fkey" FOREIGN KEY ("rent_settings_id") REFERENCES "rent_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saving_account" ADD CONSTRAINT "saving_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "saving_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingPlan" ADD CONSTRAINT "SavingPlan_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "saving_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "salary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
