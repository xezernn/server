const express = require('express');
const router = express.Router();

const { createProduct, getProducts, getProductById, editProduct, deleteProductById, searchProduct, getProductsByCategory, getProductsBySubcategory, getDiscountedProducts, getTopSellingProducts } = require('../controllers/products.controllers');

const auth = require('../middlewares/auth.middleware');

//axiosInstanse.METHOD(`/products/DIRNAGIN_ICINDE_YAZILANLAR`)
// METHOD = reoter.get , reouet.post ve s yeni noqteden sonrakilar

router.get('/', getProducts);
router.post('/', auth, createProduct);
router.get('/discounted', getDiscountedProducts);

// en cox satilan mehsullar!
router.get('/populyar', getTopSellingProducts);
router.get('/search', searchProduct);

router.get('/:id', getProductById);
router.put('/:id', auth, editProduct);
router.delete('/:id', auth, deleteProductById);

router.get('/category/:id', getProductsByCategory);
router.get('/subcategory/:id', getProductsBySubcategory);

module.exports = router;
