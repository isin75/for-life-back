/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `rent_settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rentSettingsId` to the `gas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `rent_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gas" ADD COLUMN     "rentSettingsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rent_settings" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rent_settings_user_id_key" ON "rent_settings"("user_id");

-- AddForeignKey
ALTER TABLE "rent_settings" ADD CONSTRAINT "rent_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gas" ADD CONSTRAINT "gas_rentSettingsId_fkey" FOREIGN KEY ("rentSettingsId") REFERENCES "rent_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
