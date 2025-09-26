const express = require("express");
const asyncHandler = require('express-async-handler'); // Import the handler
const categorySchema = require("../utils/validation/categorySchema");
const ajvValidation = require("../middlewares/ajvValidation")
const router = express.Router();
const idParamHandler = require("../middlewares/id.middleware");
const {
    getAllCategories,
    getCategorybyID,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");

router.param("id", idParamHandler);

router.get("/", asyncHandler(getAllCategories));
router.get("/:id", asyncHandler(getCategorybyID));
router.post("/", ajvValidation(categorySchema), asyncHandler(createCategory));
router.put("/:id",ajvValidation(categorySchema), asyncHandler(updateCategory));
router.delete("/:id", asyncHandler(deleteCategory));

module.exports = router;