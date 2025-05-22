const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const connection = require("./config/db");

// executing connection
connection.connect(function (err) {
  if (err) {
    console.error("Error occurred while connecting:", err);
  } else {
    console.log("Connection created with MySQL successfully");
  }
});

const resultRoutes = require("./routes/resultRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const userDetailsRoute = require("./routes/userDetailsRoute");
 
app.use("/api", surveyRoutes); //for user submit survey
app.use("/admin", resultRoutes); // for getting all results
app.use("/user", userDetailsRoute); //for getting user details

app.listen(3000, () => {
  console.log("Server is running on port 3000"); 
});
