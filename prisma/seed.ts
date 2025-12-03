import { prisma } from './prisma'

async function main() {
  console.log('🌮 Seeding database...')

  await prisma.tacoFilling.deleteMany()
  await prisma.taco.deleteMany()
  await prisma.filling.deleteMany()
  await prisma.sauce.deleteMany()
  await prisma.tortilla.deleteMany()

  const tortillas = await Promise.all([
    prisma.tortilla.create({
      data: {
        name: 'Tortilla de Maíz Simple',
        price: 15,
      },
    }),
    prisma.tortilla.create({
      data: {
        name: 'Tortilla de Maíz Doble',
        price: 25,
      },
    }),
    prisma.tortilla.create({
      data: {
        name: 'Tortilla de Harina Simple',
        price: 18,
      },
    }),
    prisma.tortilla.create({
      data: {
        name: 'Tortilla de Harina Doble',
        price: 30,
      },
    }),
  ])

  console.log(`✅ Created ${tortillas.length} tortillas`)

  const fillings = await Promise.all([
    prisma.filling.create({ data: { name: 'Carne Asada', price: 35 } }),
    prisma.filling.create({ data: { name: 'Pollo', price: 30 } }),
    prisma.filling.create({ data: { name: 'Pastor', price: 32 } }),
    prisma.filling.create({ data: { name: 'Carnitas', price: 33 } }),
    prisma.filling.create({ data: { name: 'Chorizo', price: 28 } }),
    prisma.filling.create({ data: { name: 'Pescado', price: 40 } }),
    prisma.filling.create({ data: { name: 'Camarón', price: 45 } }),
    prisma.filling.create({ data: { name: 'Vegetales', price: 25 } }),
    prisma.filling.create({ data: { name: 'Frijoles', price: 20 } }),
    prisma.filling.create({ data: { name: 'Queso', price: 22 } }),
  ])

  console.log(`✅ Created ${fillings.length} fillings`)

  const sauces = await Promise.all([
    prisma.sauce.create({ data: { name: 'Salsa Roja', price: 5 } }),
    prisma.sauce.create({ data: { name: 'Salsa Verde', price: 5 } }),
    prisma.sauce.create({ data: { name: 'Salsa Habanera', price: 8 } }),
    prisma.sauce.create({ data: { name: 'Guacamole', price: 15 } }),
    prisma.sauce.create({ data: { name: 'Pico de Gallo', price: 10 } }),
  ])

  console.log(`✅ Created ${sauces.length} sauces`)

  await prisma.taco.create({
    data: {
      tortillaId: tortillas[0].id,
      sauceId: sauces[0].id,
      fillings: {
        create: [
          { fillingId: fillings[0].id },
          { fillingId: fillings[9].id },
        ],
      },
      doubleTortilla: true,
    },
  })

  await prisma.taco.create({
    data: {
      tortillaId: tortillas[1].id,
      sauceId: sauces[3].id,
      fillings: {
        create: [
          { fillingId: fillings[1].id },
          { fillingId: fillings[7].id },
          { fillingId: fillings[9].id },
        ],
      },
      doubleTortilla: false,
    },
  })

  console.log('✅ Created sample tacos')
  console.log('🌮 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
