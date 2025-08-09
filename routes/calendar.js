const { default: axios } = require("axios");
const { render } = require("ejs");
const express = require("express");
const router = express.Router();

var common = require("../services/common");

require("dotenv").config();

router.get("/daily", async (req, res) => {
  res.render("calendar/daily", {
    title: "Daily",
  });
});

router.get("/create", async (req, res) => {
  res.render("calendar/create", {
    title: "Create New Schedule",
  });
});

router.get("/getDaily/:type/:date", async (req, res) => {
  var data = {};
  data = await common.httpRequest(
    "GET",
    `${process.env.API_URL}/schedules/getDaily/${req.params.type}/${req.params.date}`,
    {},
    {}
  );
  return res.status(200).send(data);
});

router.post("/create", async (req, res) => {
  var data = {};
  data = await common.httpRequest(
    "GET",
    `${process.env.API_URL}/schedules/create`,
    {},
    req.body
  );
  res.render("calendar/daily_created", {
    title: "Created Event",
    data: data,
  });
});

module.exports = router;
