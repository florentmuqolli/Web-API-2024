const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const User = require('../backend/models/user');
const authMiddleware = require('../backend/middleware/authMiddleware');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/products", productRoutes);
app.get('/api/users', authMiddleware, async (req, res) => {
    console.log('GET /api/users called');
    try {
        const users = await User.find(); 
        console.log('Fetched users:', users);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});



mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});