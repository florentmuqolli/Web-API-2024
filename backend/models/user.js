const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee', 'admin', 'owner'], default: 'user' },
    plan: { type: String, enum: ['basic', 'standard', 'premium'], default: 'basic' }
});
const User = mongoose.model('User', userSchema);
module.exports = User;