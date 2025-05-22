const e = require("express");
const connection = require("../config/db");
//Fetch all questions from the database

const getQuestions = (req, res) => {
  const sql = "SELECT id, question, A, B, C, D FROM questions";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};

// Submit survey responses and calculate score
const submitSurvey = (req, res) => {
  const { name, email, responses } = req.body;

  // Fetch all questions to calculate score
  connection.query("SELECT * FROM questions", (err, questions) => {
    if (err) return res.status(500).json({ error: err.message });

    let score = 0;
    questions.forEach((question, index) => {
      if (responses[index] === question.correct_answer) {
        score++;
      }
    });

    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const responsesString = JSON.stringify(responses);

        // Check if user already exists
        if (results.length > 0) {
          return res.status(200).json({
            message: "Thank you for submitting again.",
          });
        } else {
          // Insert new user
          connection.query(
            "INSERT INTO users (name, email, score, responses) VALUES (?, ?, ?, ?)",
            [name, email, score, responsesString],
            (insertErr) => {
              if (insertErr)
                return res.status(500).json({ error: insertErr.message });

              return res.status(200).json({
                message: "Survey submitted successfully.",
              });
            }
          );
        }
      }
    );
  });
};

module.exports = {
  getQuestions,
  submitSurvey,
};
