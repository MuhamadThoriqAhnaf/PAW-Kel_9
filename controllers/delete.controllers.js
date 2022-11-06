exports.removeBooks = (req, res) => {
  //find the book by the id parameter first, then locate and remove the post specified by the id in req.body 
  User.findById(req.params.id, function(err, result) {
    if (!err) {
      if (!result){
        res.status(404).send('Book was not found');
      }
      else{
        result.remove(function(removeerr, ) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        result.markModified('posts'); 
            res.status(200).send(saveresult);
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};