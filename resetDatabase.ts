// resetDatabase.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetDatabase() {
  await prisma.goalsSettings.deleteMany({})
  // Добавьте сюда другие модели по аналогии

  console.log('База данных успешно очищена.')
}

resetDatabase()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
