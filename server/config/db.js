const mongoose = require('mongoose');


const db = require("../model");
const Role = db.role;

const connectDB = async () => {
    const connection = await mongoose.connect("mongodb+srv://dbPAW:burungkecil123@cluster0.pvbdsir.mongodb.net/dbPAW?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`);
    initial();
}; 

function initial() 
{
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = connectDB;