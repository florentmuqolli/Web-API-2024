const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Funksioni për regjistrimin e përdoruesit
const registerUser  = async (req, res) => {
    console.log("Request Body:", req.body);
    const { name, password, email, role } = req.body; // Correct fields

    console.log("Registering user:", { name, email, role });

    try {
        // Kontrolloni nëse përdoruesi ekziston
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'Përdoruesi ekziston' });
        }

        // Kriptoni fjalëkalimin
        const hashedPassword = await bcrypt.hash(password, 10);

        // Krijoni një përdorues të ri
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' if no role is provided
        });

        res.status(201).json({ message: 'Përdorues i regjistruar me sukses' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Gabim në regjistrim', error: error.message });
    }
};

// Funksioni për autentifikimin e përdoruesit
const loginUser  = async (req, res) => {
    const { email, password } = req.body;

    console.log('Attempting to log in with email:', email);

    try {
        // Gjeni përdoruesin
        const user = await User.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            return res.status(400).json({ message: 'Përdoruesi nuk ekziston' });
        }

        // Kontrolloni fjalëkalimin
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match status:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Fjalëkalimi i gabuar' });
        }

        // Krijoni një token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Gabim në autentifikim' });
    }
};

module.exports = { registerUser , loginUser  };

