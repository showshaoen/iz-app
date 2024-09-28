const express = require("express");
const { auth } = require("express-openid-connect");

// New location commit

// App and Socket Initialization
const app = express();

require("dotenv").config();

// Authentication Setup (auth0)
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
  clientSecret: process.env.CLIENTSECRET,
  authorizationParams: {
    response_type: "code",
    audience: "https://localhost:5000",
    scope: "openid profile email",
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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
