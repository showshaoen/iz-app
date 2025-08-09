const { default: axios } = require("axios");
const { render } = require("ejs");
const express = require("express");
const router = express.Router();

var common = require("../services/common");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

router.get("/dashboard", async (req, res) => {
  let data = {};
  res.render("dashboard", {
    title: "Dashboard",
    data,
  });
});

router.get("/getDaily/:type/:date", async (req, res) => {
  var data = {};
  data = await common.httpRequest(
    "GET",
    `http://localhost:5000/schedules/getDaily/${req.params.type}/${req.params.date}`,
    headers,
    {}
  );
  return res.status(200).send(data);
});

module.exports = router;
