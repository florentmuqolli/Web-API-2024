const connectMySQL = require('../config/mysql');
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

// Create Product
exports.createProduct = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) return res.status(500).json({ error: 'File upload failed' });

        const { productName, description, price, category } = req.body;
        const imageURL = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const connection = await connectMySQL();  // Wait for the connection
            const sql = "INSERT INTO products (productName, description, price, category, imageURL) VALUES (?, ?, ?, ?, ?)";
            const [result] = await connection.execute(sql, [productName, description, price, category, imageURL]);
            res.status(201).json({ message: "Product added successfully", productID: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.getAllProducts = async (req, res) => {
    try {
        const connection = await connectMySQL(); 
        const sql = "SELECT * FROM products";
        const [results] = await connection.execute(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const connection = await connectMySQL(); 
        const sql = "SELECT * FROM products WHERE productID = ?";
        const [result] = await connection.execute(sql, [req.params.id]);

        if (result.length === 0) return res.status(404).json({ message: "Product not found" });
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        const { productName, description, price, category } = req.body;
        const imageURL = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl; 

        console.log('Updating product with ID:', req.params.id);
        console.log('Product data:', { productName, description, price, category, imageURL });

        try {
            const connection = await connectMySQL();
            const sql = "UPDATE products SET productName = ?, description = ?, price = ?, category = ?, imageURL = ? WHERE productID = ?";
            const [result] = await connection.execute(sql, [productName, description, price, category, imageURL, req.params.id]);

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
        const connection = await connectMySQL(); 
        const sql = "DELETE FROM products WHERE productID = ?";
        const [result] = await connection.execute(sql, [req.params.id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
