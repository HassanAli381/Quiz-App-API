const express = require("express");
const asyncHandler = require('express-async-handler'); // Import the handler
const router = express.Router();
const questionSchema = require("../utils/validation/questionSchema");
const ajvValidation = require("../middlewares/ajvValidation")
const idParamHandler = require("../middlewares/id.middleware");
const {
    getQuestions,
    getQuestionbyId,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require("../controllers/question.controller");

router.param("id", idParamHandler);
/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API for managing quiz questions
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions or filter questions
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: catId
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filter by difficulty
 *       - in: query
 *         name: nQuestions
 *         schema:
 *           type: integer
 *         description: Limit number of returned questions
 *     responses:
 *       200:
 *         description: List of questions (possibly filtered)
 *       400:
 *         description: Invalid query parameters
 */
router.get("/", asyncHandler(getQuestions));
/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Get a single question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question found
 *       400:
 *         description: Invalid ID or not found
 */
router.get("/:id", asyncHandler(getQuestionbyId));
/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", ajvValidation(questionSchema), asyncHandler(createQuestion));
/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Update an existing question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       400:
 *         description: Invalid ID or validation error
 */
router.put("/:id", ajvValidation(questionSchema), asyncHandler(updateQuestion));
/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       400:
 *         description: Invalid ID or not found
 */
router.delete("/:id", asyncHandler(deleteQuestion));

module.exports = router;