const express = require('express')
const router = express.Router();

const {createBook, updateBook, getSingleBook, getAllBooks, removeBooks} = require('../controllers/MyLibraryController');
router.post('/', createBook);
router.put('/update/:id', updateBook);
router.get('/getbook/:id', getSingleBook);
router.get('/getbook', getAllBooks);
router.delete('/removebook/:id', removeBooks)


module.exports=router