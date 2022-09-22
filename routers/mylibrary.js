const express = require('express')
const router = express.Router();

const {createBook} = require('../controllers/MyLibraryCrontoller');
router.route('/').post(createBook);

module.exports=router