const express = require("express");
const asyncHandler = require("express-async-handler"); // Import the handler

const router = express.Router();
const idParamHandler = require("../middlewares/id.middleware");

const { getUserbyId } = require("../controllers/auth.controller")
router.param("id", idParamHandler);
router.get("/:id", asyncHandler(getUserbyId));
router.get("/:userId", asyncHandler(getUserbyId));

module.exports = router;