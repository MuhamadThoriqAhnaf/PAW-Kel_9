const express = require("express");
const router = express.Router();

const {
  createBook,
  updateBook,
  getSingleBook,
  getAllBooks,
  removeBooks,
} = require("../controllers/MyLibraryController");
router.post("/", createBook);
router.put("/:id", updateBook);
router.get("/:id", getSingleBook);
router.get("/", getAllBooks);
router.delete("/:id", removeBooks);

module.exports = router;
