const router = require('express').Router();
const idParamHandler = require("../middlewares/id.middleware");

const { getExam, createExam, gradeExam, getAllExams } = require('../controllers/exam.controller');

router.param("id", idParamHandler);

router.get('/', getAllExams);
router.get('/:id', getExam);
router.post('/', createExam);
router.get('/grade/:id', gradeExam);


module.exports = router;