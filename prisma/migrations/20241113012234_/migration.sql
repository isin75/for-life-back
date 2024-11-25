/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `GoalsSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GoalsSettings_user_id_key" ON "GoalsSettings"("user_id");
