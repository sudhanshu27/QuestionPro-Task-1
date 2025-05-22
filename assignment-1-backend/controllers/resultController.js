//api for getting result of all users rank wise in one page, can accessed by admin only
const connection = require("../config/db");

const getAllResults = (req, res) => {
  const sql = "SELECT * FROM users ORDER BY score DESC";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching results:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
};

module.exports = {
  getAllResults,
};
