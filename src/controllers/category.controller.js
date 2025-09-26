const Category = require("../models/category.model");
const { SUCCESS, FAIL } = require("../utils/responseStatus");
// getallcat , getcatbyid , createcat , updatecat , deletecat

const getAllCategories = async (req, res) => {
    const allCategories = await Category.find({});
    if (allCategories.length === 0) {
        res.status(200).json({
            status: SUCCESS,
            msg: "No Data Found"
        })
        return;
    }
    res.status(200).json({
        status: SUCCESS,
        length: allCategories.length,
        msg: "all categoris retrived",
        data: allCategories
    });
};

const getCategorybyID = async (req, res) => {
    const category = await Category.findById(req.validId);
    if (!category) {
        res.status(400).json({
            status: FAIL,
            msg: "No Such ID"
        })
        return;
    }
    res.status(200).json({
        status: SUCCESS,
        msg: "Category retrived",
        data: category,
    });
};

const createCategory = async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
        status: SUCCESS,
        msg: "New Category is added",
        data: newCategory
    })
};

const updateCategory = async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.validId, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedCategory) {
        res.status(200).json({
            status: FAIL,
            msg: "Faild to update category"
        })
        return;
    }
    res.status(200).json({
        status: SUCCESS,
        msg: "Category updated!",
        data: updatedCategory
    })
};

const deleteCategory = async (req, res) => {
    const delObj = await Category.findByIdAndDelete(req.validId);
    if (!delObj) {
        res.status(400).json({
            status: FAIL,
            msg: "No such ID"
        })
        return;
    }
    res.status(204).json({
        status: SUCCESS,
        msg: "Category Deleted!",
        data: delObj
    })
};

module.exports = {
    getAllCategories,
    getCategorybyID,
    createCategory,
    updateCategory,
    deleteCategory
}