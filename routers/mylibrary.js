const express = require('express')
const router = express.Router();

const {createBook, getSingleBook, getAllBooks} = require('../controllers/MyLibraryController');
router.post('/', createBook);
router.get('/:id', getSingleBook);
router.get('/', getAllBooks);


module.exports=router