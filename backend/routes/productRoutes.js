const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/", authMiddleware, createProduct);
router.get("/", getAllProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", authMiddleware, updateProduct); 
router.delete("/:id", authMiddleware, deleteProduct);
router.use(cookieParser())

module.exports = router;
