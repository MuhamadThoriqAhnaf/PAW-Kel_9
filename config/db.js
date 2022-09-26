const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect("mongodb+srv://dbPAW:agnesiqbalfarrasfatin@cluster0.fgtvvu8.mongodb.net/mylibraries?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`);
}; 

module.exports = connectDB;