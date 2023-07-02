const mongoose = require('mongoose');

 const connectDB = async () => {
    try {
        return await mongoose.connect('mongodb://127.0.0.1:27017/preps', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.error(`Error ${e.stack}`);
    }
};

module.exports = connectDB;