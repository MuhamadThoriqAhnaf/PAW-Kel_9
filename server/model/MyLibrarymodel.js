const mongoose = require("mongoose");

const MyLibrarySchema = mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  penulis: {
    type: String,
    required: true,
  },
  terbit: {
    type: String,
    required: true,
  },
  pinjam: {
    type: String,
    required: false,
  },
  pengembalian: {
     type: String,
     required: false,
  },
  sinopsis: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: false,
  },
});

const Mylibrary = mongoose.model("Mylibraries", MyLibrarySchema);

module.exports = Mylibrary;
// export default mongoose.model("mylibraries", MyLibrarySchema )
