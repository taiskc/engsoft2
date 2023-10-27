const express = require("express");
const router = express.Router();
const {getCategories, getCategory, updateCategory, deleteCategory, createCategory} = require("../controllers/categoryController");

router.route("/").get(getCategories).post(createCategory);

router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;