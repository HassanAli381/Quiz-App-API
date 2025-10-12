const router = require('express').Router();
const idParamHandler = require("../middlewares/id.middleware");

const { getExam, createExam, gradeExam, getAllExams } = require('../controllers/exam.controller');
// const auth = require('../middlewares/auth');

router.param("id", idParamHandler);
/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Exam management APIs
 */

/**
 * @swagger
 * /api/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all exams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exam'
 */
router.get('/', /*auth,*/ getAllExams);
/**
 * @swagger
 * /api/exams/{id}:
 *   get:
 *     summary: Get exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The exam ID
 *     responses:
 *       200:
 *         description: Exam retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 */
router.get('/:id', /*auth,*/ getExam);
/**
 * @swagger
 * /api/exams:
 *   post:
 *     summary: Create a new exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - difficulty
 *               - numberOfQuestions
 *               - categoryId
 *             properties:
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 example: medium
 *               numberOfQuestions:
 *                 type: integer
 *                 example: 10
 *               time:
 *                 type: integer
 *                 description: Exam duration in milliseconds
 *                 example: 600000
 *               categoryId:
 *                 type: string
 *                 example: 6524e3c9120abf3a5c5f1234
 *     responses:
 *       201:
 *         description: Exam created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     questions number:
 *                       type: integer
 *                       example: 10
 *                     newExam:
 *                       $ref: '#/components/schemas/Exam'
 *                     questions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Question'
 *                     questionsAndGrades:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           questionId:
 *                             type: string
 *                           userAns:
 *                             type: string
 *                             nullable: true
 */
router.post('/', /*auth,*/ createExam);
/**
 * @swagger
 * /api/exams/grade/{id}:
 *   get:
 *     summary: Grade an exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The exam ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     userAns:
 *                       type: string
 *     responses:
 *       201:
 *         description: Exam graded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     Grade:
 *                       type: integer
 *                       example: 7
 *                     exam:
 *                       $ref: '#/components/schemas/Exam'
 */
router.post('/grade/:id', /*auth,*/ gradeExam);


module.exports = router;