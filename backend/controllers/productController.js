const { pool } = require('../config/mysql');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

exports.createProduct = async (req, res) => {
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'imageGallery', maxCount: 10 }
    ])(req, res, async (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        const { productName, description, price, category, tags, type } = req.body;
        const imageURL = req.files.image && req.files.image[0]
            ? `/uploads/${req.files.image[0].filename}`
            : null;

        const galleryArray = req.files.imageGallery
            ? req.files.imageGallery.map(file => `/uploads/${file.filename}`)
            : [];

            const tagsArray = tags.split(',').map(tag => tag.trim());
            const tagsJSON = JSON.stringify(tagsArray);

        try {
            const [result] = await pool.execute(
                "INSERT INTO products (productName, description, price, category, imageURL, imageGallery, tags, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    productName,
                    description,
                    price,
                    category,
                    imageURL,
                    JSON.stringify(galleryArray),
                    tagsJSON,
                    type
                ]
            );
            res.status(201).json({ message: "Product added successfully", productID: result.insertId });
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: err.message });
        }
    });
};


exports.getAllProducts = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM products");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const [result] = await pool.execute("SELECT * FROM products WHERE productID = ?", [req.params.id]);

        if (result.length === 0) return res.status(404).json({ message: "Product not found" });
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'imageGallery', maxCount: 10 }
    ])(req, res, async (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        const { productName, description, price, category, tags, type } = req.body;
        const imageURL = req.files.image && req.files.image[0]
            ? `/uploads/${req.files.image[0].filename}`
            : req.body.imageUrl;

        const galleryArray = req.files.imageGallery
            ? req.files.imageGallery.map(file => `/uploads/${file.filename}`)
            : JSON.parse(req.body.imageGallery || '[]');

            const tagsArray = tags.split(',').map(tag => tag.trim());
            const tagsJSON = JSON.stringify(tagsArray);

        try {
            const [result] = await pool.execute(
                "UPDATE products SET productName = ?, description = ?, price = ?, category = ?, imageURL = ?, imageGallery = ?, tags = ?, type = ? WHERE productID = ?",
                [
                    productName,
                    description,
                    price,
                    category,
                    imageURL,
                    JSON.stringify(galleryArray),
                    tagsJSON,
                    type,
                    req.params.id
                ]
            );

            if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
            res.json({ message: "Product updated successfully" });
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: err.message });
        }
    });
};


exports.deleteProduct = async (req, res) => {
    try {
        const [result] = await pool.execute("DELETE FROM products WHERE productID = ?", [req.params.id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
