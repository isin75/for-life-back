-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_debt_id_fkey";

-- AlterTable
ALTER TABLE "goals" ALTER COLUMN "debt_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_debt_id_fkey" FOREIGN KEY ("debt_id") REFERENCES "debt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
