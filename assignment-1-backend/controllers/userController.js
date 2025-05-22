const connection = require("../config/db");

const getUserDetails = (req, res) => {
  const { email } = req.params;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, userResults) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = userResults[0];
      const userResponses = JSON.parse(user.responses);

      connection.query("SELECT * FROM questions", (err, questions) => {
        if (err) {
          console.error("Error fetching questions:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        const detailedResponses = questions.map((question, index) => {
          const userAnswerLetter = userResponses[index];
          const correctAnswerLetter = question.correct_answer;

          return {
            question: question.question,
            userAnswer: {
              option: userAnswerLetter,
              text: question[userAnswerLetter] || "Not Answered",
            },
            correctAnswer: {
              option: correctAnswerLetter,
              text: question[correctAnswerLetter],
            },
            isCorrect: userAnswerLetter === correctAnswerLetter,
          };
        });

        res.status(200).json({
          name: user.name,
          email: user.email,
          score: user.score,
          detailedResponses,
        });
      });
    }
  );
};

module.exports = { getUserDetails };
