const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect("mongodb+srv://dbPAW:burungkecil123@cluster0.pvbdsir.mongodb.net/dbPAW?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`);
}; 

module.exports = connectDB;