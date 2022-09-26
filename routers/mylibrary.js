const express = require('express')
const router = express.Router();

const {createBook, updateBook, getSingleBook, getAllBooks} = require('../controllers/MyLibraryController');
router.post('/', createBook);
router.put('/:id', updateBook);
router.get('/:id', getSingleBook);
router.get('/', getAllBooks);


module.exports=router