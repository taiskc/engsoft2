const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");

const getCategories = asyncHandler (async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

const createCategory = asyncHandler (async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const category = await Category.create({ name })
    res.status(201).json(category);
});

const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found")
    }
    res.status(200).json(category);
});

const updateCategory = asyncHandler(async(req, res) => {
    res.status(201).json({ message: `Update category for ${req.params.id}`});
});

const deleteCategory = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Delete category for ${req.params.id}`});
});

module.exports = { getCategories, createCategory, getCategory, updateCategory, deleteCategory };