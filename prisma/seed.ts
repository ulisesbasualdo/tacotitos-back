import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌮 Seeding database...');

  // Clean existing data
  await prisma.tacoFilling.deleteMany();
  await prisma.taco.deleteMany();
  await prisma.filling.deleteMany();
  await prisma.sauce.deleteMany();
  await prisma.tortilla.deleteMany();

  // Create Tortillas
  const tortillas = await Promise.all([
    prisma.tortilla.create({
      data: {
        nombre: 'Tortilla de Maíz Simple',
        precio: 15.0,
        tipoTortilla: 'single',
      },
    }),
    prisma.tortilla.create({
      data: {
        nombre: 'Tortilla de Maíz Doble',
        precio: 25.0,
        tipoTortilla: 'double',
      },
    }),
    prisma.tortilla.create({
      data: {
        nombre: 'Tortilla de Harina Simple',
        precio: 18.0,
        tipoTortilla: 'single',
      },
    }),
    prisma.tortilla.create({
      data: {
        nombre: 'Tortilla de Harina Doble',
        precio: 30.0,
        tipoTortilla: 'double',
      },
    }),
  ]);

  console.log(`✅ Created ${tortillas.length} tortillas`);

  // Create Fillings
  const fillings = await Promise.all([
    prisma.filling.create({ data: { nombre: 'Carne Asada', precio: 35.0 } }),
    prisma.filling.create({ data: { nombre: 'Pollo', precio: 30.0 } }),
    prisma.filling.create({ data: { nombre: 'Pastor', precio: 32.0 } }),
    prisma.filling.create({ data: { nombre: 'Carnitas', precio: 33.0 } }),
    prisma.filling.create({ data: { nombre: 'Chorizo', precio: 28.0 } }),
    prisma.filling.create({ data: { nombre: 'Pescado', precio: 40.0 } }),
    prisma.filling.create({ data: { nombre: 'Camarón', precio: 45.0 } }),
    prisma.filling.create({ data: { nombre: 'Vegetales', precio: 25.0 } }),
    prisma.filling.create({ data: { nombre: 'Frijoles', precio: 20.0 } }),
    prisma.filling.create({ data: { nombre: 'Queso', precio: 22.0 } }),
  ]);

  console.log(`✅ Created ${fillings.length} fillings`);

  // Create Sauces
  const sauces = await Promise.all([
    prisma.sauce.create({ data: { nombre: 'Salsa Roja', precio: 5.0 } }),
    prisma.sauce.create({ data: { nombre: 'Salsa Verde', precio: 5.0 } }),
    prisma.sauce.create({ data: { nombre: 'Salsa Habanera', precio: 8.0 } }),
    prisma.sauce.create({ data: { nombre: 'Guacamole', precio: 15.0 } }),
    prisma.sauce.create({ data: { nombre: 'Pico de Gallo', precio: 10.0 } }),
  ]);

  console.log(`✅ Created ${sauces.length} sauces`);

  // Create sample tacos
  const taco1 = await prisma.taco.create({
    data: {
      tortillaId: tortillas[0].id,
      sauceId: sauces[0].id,
      fillings: {
        create: [
          { fillingId: fillings[0].id },
          { fillingId: fillings[9].id },
        ],
      },
    },
  });

  const taco2 = await prisma.taco.create({
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
    },
  });

  console.log(`✅ Created 2 sample tacos`);
  console.log('🌮 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
