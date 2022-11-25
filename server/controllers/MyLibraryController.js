const mongoose = require("mongoose");
const AsyncHandler = require("express-async-handler");

const Mylibrary = require("../model/Mylibrarymodel");

exports.createBook = AsyncHandler(async (req, res) => {
  if (
    !req.body.judul &&
    req.body.penulis &&
    req.body.terbit &&
    req.body.pinjam &&
    // req.body.pengembalian &&
    req.body.sinopsis &&
    req.body.imageurl
  ) {
    res.status(400).send({ message: "Content can't be empty!" });
    return;
  }

  console.log(req.body.imageurl);

  const mylibrary = new Mylibrary({
    judul: req.body.judul,
    penulis: req.body.penulis,
    terbit: req.body.terbit,
    pinjam: req.body.pinjam,
    // pengembalian: req.body.pengembalian,
    sinopsis: req.body.sinopsis,
    imageurl: req.body.imageurl,
  });

  mylibrary
    .save(mylibrary)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Book",
      });
    });
});

exports.updateBook = AsyncHandler(async (req, res) => {
  const { judul, penulis, terbit, pinjam, pengembalian, sinopsis, imageurl} = req.body;
  const existBook = await Mylibrary.findOne({ _id: req.params.id });
  if (existBook) {
    existBook.judul = judul;
    existBook.penulis = penulis;
    existBook.terbit = terbit;
    existBook.pinjam = pinjam;
    existBook.pengembalian = pengembalian;
    existBook.sinopsis = sinopsis;
    existBook.imageurl = imageurl;
    const updatedBook = await existBook.save();
    res.status(200).json({
      success: true,
      data: updatedBook,
      message: "Book is updated successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Book is not found",
    });
  }
});

exports.getSingleBook = AsyncHandler(async (req, res) => {
  const existBook = await Mylibrary.findOne({ _id: req.params.id });
  if (existBook) {
    res.status(200).json({
      success: true,
      data: existBook,
      message: "Book data is found",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Book data is not found",
    });
  }
});

exports.getAllBooks = AsyncHandler(async (req, res) => {
  const allBooks = await Mylibrary.find({});
  if (allBooks) {
    res.status(200).json({
      success: true,
      data: allBooks,
      message: "Books data are found",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Books data are not found",
    });
  }
});

exports.removeBooks = (req, res) => {
  //find the book by the id parameter first, then locate and remove the post specified by the id in req.body
  Mylibrary.findById(req.params.id, function (err, result) {
    if (!err) {
      if (!result) {
        res.status(404).send("Book was not found");
      } else {
        result.remove(function (removeerr, removresult) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        result.markModified("posts");
        res.status(200).send("terdelete");
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};
