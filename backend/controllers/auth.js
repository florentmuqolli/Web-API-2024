const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token from cookies:', req.cookies.authToken);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

const registerUser = async (req, res) => {
    console.log("Request Body:", req.body);
    const { name, password, email, role } = req.body;

    console.log("Registering user:", { name, email, role });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Përdoruesi ekziston' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', 
        });

        res.status(201).json({ message: 'Përdorues i regjistruar me sukses' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Gabim në regjistrim', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET not configured in environment variables');
        }
        

        console.log('Setting Cookie:', { token: accessToken });

        res.cookie('authToken', accessToken, {
            secure: false, 
            sameSite: 'lax', 
            maxAge: 3600000, 
        });

        res.cookie('userRole', user.role, {
            secure: false,
            sameSite: 'Lax',
            maxAge: 3600000, 
        });

        console.log('Token Set:', accessToken);

        res.status(200).json({ message: 'Login successful',accessToken, userRole: user.role });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

const getStatus = (req, res) => {
    const authToken = req.cookies.authToken;

    if (!authToken) {
        return res.status(401).json({ authenticated: false, message: 'No token found' });
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        return res.status(200).json({
            authenticated: true,
            userId: decoded.id,
            userRole: decoded.role,
        });
    } catch (error) {
        return res.status(401).json({ authenticated: false, message: 'Invalid or expired token' });
    }
};

module.exports = { registerUser, loginUser, verifyToken, getStatus };
