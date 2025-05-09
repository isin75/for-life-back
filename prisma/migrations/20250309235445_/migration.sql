/*
  Warnings:

  - You are about to drop the column `rentSettingsId` on the `gas` table. All the data in the column will be lost.
  - Added the required column `rent_settings_id` to the `gas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gas" DROP CONSTRAINT "gas_rentSettingsId_fkey";

-- AlterTable
ALTER TABLE "gas" DROP COLUMN "rentSettingsId",
ADD COLUMN     "rent_settings_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rent_settings" ADD COLUMN     "electric_cogeneration_fee" INTEGER,
ADD COLUMN     "electric_fixed_component" INTEGER,
ADD COLUMN     "electric_fixed_rate" INTEGER,
ADD COLUMN     "electric_kilowatt_price" INTEGER,
ADD COLUMN     "electric_network_speed" INTEGER,
ADD COLUMN     "electric_quality_rate" INTEGER,
ADD COLUMN     "electric_subscription_rate" INTEGER,
ADD COLUMN     "electric_transfer_fee" INTEGER,
ALTER COLUMN "gas_subscription_fee" DROP NOT NULL,
ALTER COLUMN "gas_conversion_rate" DROP NOT NULL,
ALTER COLUMN "gas_consumption_price" DROP NOT NULL,
ALTER COLUMN "gas_distribution_fixed" DROP NOT NULL,
ALTER COLUMN "gas_distributive_variable_price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Electric" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "electric_consumption" INTEGER NOT NULL,
    "electric_price" INTEGER NOT NULL,
    "rent_settings_id" TEXT NOT NULL,

    CONSTRAINT "Electric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "heating" JSONB NOT NULL,
    "Water" JSONB NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gas" ADD CONSTRAINT "gas_rent_settings_id_fkey" FOREIGN KEY ("rent_settings_id") REFERENCES "rent_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Electric" ADD CONSTRAINT "Electric_rent_settings_id_fkey" FOREIGN KEY ("rent_settings_id") REFERENCES "rent_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
