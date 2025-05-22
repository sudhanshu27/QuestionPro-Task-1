require("dotenv").config();
const mysql = require("mysql2");

// configurations for creating mysql connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// exporting connection object
module.exports = connection;
