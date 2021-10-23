const express = require("express");
const mysql = require("mysql");

const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 8000;

const Courseroute = require("./routes/Coureseroue");
const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/course", Courseroute);
app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
