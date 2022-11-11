const mongoose = require('mongoose');

const MyLibrarySchema =  mongoose.Schema({
    judul: {
        type: String,
        required: true
    },
    penulis: {
        type: String,
        required: true,
    },
    terbit: {
        type: Date,
        required: true
    },
    pinjam: {
        type: Date,
        required: true
    },
    pengembalian: {
        type: Date,
        required: true
    },
    stock: {
        type : Number,
        required : true
    },
    log : {type: Array, default : []}
})

const Mylibrary = mongoose.model('Mylibraries', MyLibrarySchema)

module.exports =Mylibrary
// export default mongoose.model("mylibraries", MyLibrarySchema )

