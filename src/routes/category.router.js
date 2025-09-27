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
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.param("id", idParamHandler);

router.get("/", asyncHandler(getAllCategories));
router.get("/:id", asyncHandler(getCategorybyID));
router.post("/", auth, isAdmin, asyncHandler(createCategory));
router.put("/:id", auth, isAdmin, asyncHandler(updateCategory));
router.delete("/:id", auth, isAdmin, asyncHandler(deleteCategory));

module.exports = router;