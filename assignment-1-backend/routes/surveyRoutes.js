const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/surveyController");

// Survey routes
router.get("/questions", surveyController.getQuestions);
router.post("/submit", surveyController.submitSurvey);

module.exports = router;
