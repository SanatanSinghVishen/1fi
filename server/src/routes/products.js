const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug } = require('../controllers/productController');

// GET /api/products - List all products
router.get('/', getAllProducts);

// GET /api/products/:slug - Get product by slug
router.get('/:slug', getProductBySlug);

module.exports = router;
