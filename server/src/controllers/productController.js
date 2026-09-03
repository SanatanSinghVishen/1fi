const { PrismaClient } = require('@prisma/client');
const productsData = require('../data/productsData');

const prisma = new PrismaClient();
let isDatabaseAvailable = null;

// Helper to check DB availability once
async function checkDatabase() {
  if (isDatabaseAvailable !== null) return isDatabaseAvailable;
  try {
    await prisma.$queryRaw`SELECT 1`;
    isDatabaseAvailable = true;
    console.log('✅ Connected to PostgreSQL database via Prisma.');
  } catch (error) {
    isDatabaseAvailable = false;
    console.warn('⚠️  Could not connect to PostgreSQL database. Using local seed dataset as fallback.');
    console.warn('👉 Set a valid DATABASE_URL in server/.env to use your live PostgreSQL instance.');
  }
  return isDatabaseAvailable;
}

// Slug normalizer / alias mapper
function resolveIdentifier(param) {
  if (!param) return '';
  const clean = String(param).trim().toLowerCase();
  // Map common prompt aliases
  const aliases = {
    'iphone-16-pro': 'apple-iphone-16-pro',
    'iphone-17-pro': 'apple-iphone-16-pro',
    'apple-iphone-17-pro': 'apple-iphone-16-pro',
    'samsung-s24-ultra': 'samsung-galaxy-s24-ultra',
    's24-ultra': 'samsung-galaxy-s24-ultra',
  };
  return aliases[clean] || clean;
}

// GET /api/products - List all products
const getAllProducts = async (req, res) => {
  try {
    const hasDb = await checkDatabase();
    if (hasDb) {
      const products = await prisma.product.findMany({
        include: {
          variants: {
            select: {
              id: true,
              color: true,
              colorHex: true,
              storage: true,
              price: true,
              mrp: true,
              discount: true,
              images: true,
              inStock: true,
            },
            orderBy: { price: 'asc' },
          },
        },
        orderBy: { id: 'asc' },
      });

      return res.json({
        success: true,
        source: 'postgresql',
        data: products,
      });
    }

    // Fallback if PostgreSQL is not connected
    const formatted = productsData.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand,
      category: p.category,
      description: p.description,
      rating: p.rating,
      variants: p.variants.map((v) => ({
        id: v.id,
        color: v.color,
        colorHex: v.colorHex,
        storage: v.storage,
        price: v.price,
        mrp: v.mrp,
        discount: v.discount,
        images: v.images,
        inStock: v.inStock,
      })),
    }));

    return res.json({
      success: true,
      source: 'seed_data',
      data: formatted,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
};

// GET /api/products/:identifier - Get full product details by id or slug
const getProductBySlug = async (req, res) => {
  try {
    const rawIdentifier = req.params.slug;
    const isNumericId = /^\d+$/.test(rawIdentifier);
    const resolvedSlug = resolveIdentifier(rawIdentifier);
    const hasDb = await checkDatabase();

    if (hasDb) {
      const whereCondition = isNumericId
        ? { id: parseInt(rawIdentifier, 10) }
        : { slug: resolvedSlug };

      const product = await prisma.product.findFirst({
        where: whereCondition,
        include: {
          variants: {
            include: {
              emiPlans: {
                orderBy: { tenure: 'asc' },
              },
            },
            orderBy: { price: 'asc' },
          },
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found',
        });
      }

      return res.json({
        success: true,
        source: 'postgresql',
        data: product,
      });
    }

    // Fallback if PostgreSQL is not connected
    const product = productsData.find((p) =>
      isNumericId ? p.id === parseInt(rawIdentifier, 10) : p.slug === resolvedSlug
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    return res.json({
      success: true,
      source: 'seed_data',
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
    });
  }
};

module.exports = {
  getAllProducts,
  getProductBySlug,
};
