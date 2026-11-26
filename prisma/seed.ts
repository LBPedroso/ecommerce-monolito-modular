import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.product.upsert({
    where: { sku: 'DEMO-001' },
    update: {},
    create: { name: 'Produto de exemplo', sku: 'DEMO-001', price: '49.90', stock: 10 }
  });
}

main()
  .catch((error: unknown) => {
    console.error('Falha ao executar seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
