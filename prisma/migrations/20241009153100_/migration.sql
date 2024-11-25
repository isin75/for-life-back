/*
  Warnings:

  - A unique constraint covering the columns `[salary_settings_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "salary_settings_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_salary_settings_id_key" ON "user"("salary_settings_id");
