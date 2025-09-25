const express = require("express");
const asyncHandler = require('express-async-handler'); // Import the handler
const router = express.Router();
const idParamHandler = require("../middlewares/id.middleware");
const {
    getQuestions,
    getQuestionbyId,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require("../controllers/question.controller");

router.param("id", idParamHandler);

router.get("/", asyncHandler(getQuestions));
router.get("/:id", asyncHandler(getQuestionbyId));
router.post("/", asyncHandler(createQuestion));
router.put("/:id", asyncHandler(updateQuestion));
router.delete("/:id", asyncHandler(deleteQuestion));

module.exports = router;