const express = require("express");

// App and Socket Initialization
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// View engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Require routes
var indexRouter = require("./routes/index");
var calendarRouter = require("./routes/calendar");

// Use routes
app.use("/", indexRouter);
app.use("/calendar", calendarRouter);

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`Site: ${process.env.BASEURL}`);
});
