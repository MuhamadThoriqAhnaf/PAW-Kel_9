const express = require('express')
const router = express.Router();

const {createBook, getSingleBook, getAllBooks} = require('../controllers/MyLibraryController');
router.route('/').post(createBook);
router.route('/:id').get(getSingleBook);
router.route('/').get(getAllBooks);


module.exports=router