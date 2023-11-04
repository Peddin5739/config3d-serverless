const express = require("express");
const mysql = require("mysql2");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

// Setup CORS options
const corsOptions = {
  origin: "*", // replace with your specific domain, or use '*' to allow all domains
  methods: "GET", // replace with the HTTP methods you want to allow
  allowedHeaders: ["Content-Type"], // replace with the headers you want to allow
};

// Enable CORS using the cors middleware
app.use(cors(corsOptions));
app.use(express.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/data", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: results });
  });
});

app.post("/record-colors-time", (req, res) => {
  // access the client data
  const cdata = req.body;
  //process the dta
  const processedData = {
    message: "data received sucesss fully ",
    input: cdata,
  };
  res.status(200).json(processedData);
});

module.exports.handler = serverless(app);
