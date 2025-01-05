const mongoose = require('mongoose');
const User = require('../models/user'); 
const db = require('../config/database')

mongoose.connect('mongodb://localhost:27017/uebfaqetepersonalizuara', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const addPlanField = async () => {
    try {
        const result = await User.updateMany({}, { $set: { plan: 'basic' } }); 
        console.log(`Updated ${result.modifiedCount} user(s).`);
        mongoose.connection.close();
    } catch (error) {
        console.error('Error updating users:', error);
        mongoose.connection.close();
    }
};

addPlanField();
