const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
    console.log('Incoming Login Request:', req.body);

    const { email, password } = req.body;
    
    if (!email || !password) {
        console.error('Missing fields:', { email, password });
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            console.log('User  does not exist:', email);
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Incorrect password for user:', email);
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        console.log('Access token generated:', accessToken);

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET not configured in environment variables');
        }
        console.log('Setting Cookie:', { token: accessToken });

        res.cookie('authToken', accessToken, {
            secure: false, 
            sameSite: 'none', 
            maxAge: 3600000,
            path: '/' 
        });

        res.cookie('userRole', user.role, {
            secure: false,
            sameSite: 'none',
            maxAge: 3600000,
            path: '/' 
        });

        console.log('Cookies set:', { authToken: accessToken, userRole: user.role });
        res.status(200).json({ message: 'Login successful',accessToken, userRole: user.role });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id,{ name, email, role },{ new: true, runValidators: true } );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

const getStatus = (req, res) => {
    const authToken = req.cookies.authToken;

    if (!authToken) {
        console.log('ska token');
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

module.exports = {
    registerUser,
    loginUser,
    getStatus,
    getUsers,
    updateUser,
    deleteUser,
};
