const express = require("express");
const asyncHandler = require('express-async-handler'); // Import the handler
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
router.post("/", asyncHandler(createCategory));
router.put("/:id", asyncHandler(updateCategory));
router.delete("/:id", asyncHandler(deleteCategory));

module.exports = router;