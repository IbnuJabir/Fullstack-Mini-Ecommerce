import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create demo shoes
  const shoes = await Promise.all([
    prisma.shoe.create({
      data: {
        name: 'Air Jordan 1',
        brand: 'Nike',
        userId: user.id,
      },
    }),
    prisma.shoe.create({
      data: {
        name: 'Yeezy Boost 350',
        brand: 'Adidas',
        userId: user.id,
      },
    }),
    prisma.shoe.create({
      data: {
        name: 'Chuck Taylor All Star',
        brand: 'Converse',
        userId: user.id,
      },
    }),
  ]);

  console.log(`✅ Created ${shoes.length} demo shoes`);
  console.log('🎉 Seed completed successfully!');
  console.log('\n📝 Demo credentials:');
  console.log('   Email: demo@example.com');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
