const mongoose = require('mongoose');
const AsyncHandler = require('express-async-handler');

const Mylibrary = require('../models/Mylibrarymodel');

exports.createBook = AsyncHandler(async(req,res) => {
    const {judul, penulis, terbit, pinjam, pengembalian} = req.body
    const mylibrary = await Mylibrary.save({judul, penulis, terbit, pinjam, pengembalian});
    res.status(201).json({
        success: true,
        data: mylibrary,
        message: 'Data book is created successfully'
    })
})

exports.getSingleBook = AsyncHandler(async(req,res)=> {
    const existBook = await Mylibrary.findOne({_id : req.params.id});
    if(existBook){
        res.status(200).json({
            success: true,
            data:existBook,
            message:'Book data is found'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message:'Book data is not found'
        })
    }
})

exports.getAllBooks = AsyncHandler(async(req,res)=> {
    const allBooks = await Mylibrary.find({})
    if(allBooks){
        res.status(200).json({
            success: true,
            data:allBooks,
            message:'Books data are found'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message:'Books data are not found'
        })
    }
})