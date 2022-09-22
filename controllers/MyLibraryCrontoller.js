const mongoose = require('mongoose');
const AsyncHandler = require('express-async-handler');

const Mylibrary = require('../models/Mylibrarymodel');

exports.createMylibrary = AsyncHandler(async(req,res)=> {
    const {judul, penulis, terbit, pinjam, pengembalian} = req.body
    const mylibrary = await Mylibrary.create(judul, penulis, terbit, pinjam, pengembalian);
    res.status(201).json({
        success: true,
        data: mylibrary,
        message: 'Data book is created successfully'
    })
})