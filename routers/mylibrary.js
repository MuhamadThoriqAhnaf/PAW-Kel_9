const express = require('express')
const router = express.Router();

const {createBook} = require('../controllers/MyLibraryCrontoller');
router.route('/').post(createBook);

// update data pada database
router.put('../controllers/MyLibraryCrontoller/:id',function(req, res, next){
    createBook.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        createBook.findOne({_id: req.params.id}).then(function(book){
            res.send(book)
        });
    });
});

module.exports=router