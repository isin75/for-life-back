/*
  Warnings:

  - You are about to drop the column `user_id` on the `goals` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `GoalsSettings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_user_id_fkey";

-- AlterTable
ALTER TABLE "GoalsSettings" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "user_id",
ADD COLUMN     "goalsSettingsId" TEXT;

-- AddForeignKey
ALTER TABLE "GoalsSettings" ADD CONSTRAINT "GoalsSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_goalsSettingsId_fkey" FOREIGN KEY ("goalsSettingsId") REFERENCES "GoalsSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
