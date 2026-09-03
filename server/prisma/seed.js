const { PrismaClient } = require('@prisma/client');
const productsData = require('../src/data/productsData');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed with Prisma...');

  // Clear existing data
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log('🧹 Cleared existing tables.');

  for (const product of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        category: product.category,
        description: product.description,
        rating: product.rating,
        variants: {
          create: product.variants.map((variant) => ({
            color: variant.color,
            colorHex: variant.colorHex,
            storage: variant.storage,
            mrp: variant.mrp,
            price: variant.price,
            discount: variant.discount,
            images: variant.images,
            inStock: variant.inStock,
            emiPlans: {
              create: variant.emiPlans.map((plan) => ({
                tenure: plan.tenure,
                monthlyPayment: plan.monthlyPayment,
                interestRate: plan.interestRate,
                totalAmount: plan.totalAmount,
                downPayment: plan.downPayment,
                processingFee: plan.processingFee,
                cashback: plan.cashback,
                cashbackLabel: plan.cashbackLabel,
                provider: plan.provider,
                isRecommended: plan.isRecommended,
              })),
            },
          })),
        },
      },
    });

    console.log(`✅ Seeded: ${createdProduct.name} (${product.variants.length} variants)`);
  }

  console.log('\n🎉 All seed data inserted into PostgreSQL successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Prisma seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
