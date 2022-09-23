const express = require('express')
const router = express.Router();

const {createBook, getSingleBook, getAllBooks} = require('../controllers/MyLibraryController');
router.route('/').post(createBook);
router.route('/:id').get(getSingleBook);
router.route('/').get(getAllBooks);


// update data pada database
router.put('../controllers/MyLibraryCrontoller/:id',function(req, res, next){
    createBook.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        createBook.findOne({_id: req.params.id}).then(function(book){
            res.send(book)
        });
    });
});

module.exports=router