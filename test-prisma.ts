import 'dotenv/config'
import { prisma } from './prisma/prisma'

async function main() {
  console.log('Probando conexión Prisma...')
  const orders = await prisma.order.findMany()
  console.log('Orders:', orders.length)
}

main()
  .catch((e) => {
    console.error('Error en test-db:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })