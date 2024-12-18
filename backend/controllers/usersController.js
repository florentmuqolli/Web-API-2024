const User = require('../models/user');

exports.createUser  = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser  = new User({ name, email, password });
        await newUser .save();
        res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUser  = async (req, res) => {
    try {
        console.log('Fetching user with ID:', req.params.id);
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User  not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error('Error fetching user:', error);
    }
};

exports.updateUser  = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User  not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser  = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User  not found' });
        res.json({ message: 'User  deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};