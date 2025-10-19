const express = require("express");

const router = express.Router();
const idParamHandler = require("../middlewares/id.middleware");

const { getUserbyId, getUserExams } = require("../controllers/user.controller")
router.param("id", idParamHandler);
router.get("/:id", getUserbyId);
router.get("/exams/:userId", getUserExams);

module.exports = router;