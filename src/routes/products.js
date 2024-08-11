const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    editProduct,
    deleteProductById,
    searchProduct,
    getProductsByCategory,
    getProductsBySubcategory,
    getDiscountedProducts,
    getTopSellingProducts
} = require('../controllers/products.controllers');


const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/create', auth, upload.array('img', 5), createProduct);
router.get('/all', getProducts);
router.get('/get/:id', getProductById);
router.put('/update/:id', auth, upload.array('img', 5), editProduct);
router.get('/search', searchProduct);
router.delete('/delete/:id', auth, deleteProductById);

router.get('/category/:id', getProductsByCategory);
router.get('/subcategory/:id', getProductsBySubcategory);

// endirim temasi 
router.get('/discounted', getDiscountedProducts);

// en cox satilan mehsullar!
router.get('/populyar', getTopSellingProducts);

module.exports = router;
