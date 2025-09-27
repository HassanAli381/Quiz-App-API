const router = require('express').Router();
const idParamHandler = require("../middlewares/id.middleware");

const { getExam, createExam, gradeExam, getAllExams } = require('../controllers/exam.controller');
const auth = require('../middlewares/auth');

router.param("id", idParamHandler);

router.get('/', auth, getAllExams);
router.get('/:id', auth, getExam);
router.post('/', auth, createExam);
router.get('/grade/:id', auth, gradeExam);


module.exports = router;