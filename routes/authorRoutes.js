const express = require('express');
const router = express.Router();

const {getAllAuthors,createAuthor, updateAuthorById, deleteAuthorById}  = require('./../controllers/authorController');


//get all 
 router.get("/",getAllAuthors);


 //post create
router.post("/",createAuthor);

//uptade

router.put("/:id_author", updateAuthorById );

//delete
router.delete("/:id_author", deleteAuthorById)


module.exports = router

