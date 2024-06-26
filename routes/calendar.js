const { default: axios } = require("axios");
const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

var common = require("../services/common");

require("dotenv").config();

router.get("/daily", requiresAuth(), async (req, res) => {
  res.render("calendar/daily", {
    title: "Daily",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get("/create", requiresAuth(), async (req, res) => {
  res.render("calendar/create", {
    title: "Create New Schedule",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get("/getDaily/:type/:date", requiresAuth(), async (req, res) => {
  // const { token_type, access_token } = req.oidc.accessToken;
  // let headers = {
  //   authorization: `${token_type} ${access_token}`,
  // };

  var data = {};
  data = await common.httpRequest(
    "GET",
    `${process.env.API_URL}/schedules/getDaily/${req.params.type}/${req.params.date}`,
    {},
    {}
  );
  return res.status(200).send(data);
});

router.post("/create", requiresAuth(), async (req, res) => {
  // const { token_type, access_token } = req.oidc.accessToken;
  // let headers = {
  //   authorization: `${token_type} ${access_token}`,
  // };

  var data = {};
  data = await common.httpRequest(
    "GET",
    `${process.env.API_URL}/schedules/create`,
    {},
    req.body
  );
  res.render("calendar/daily_created", {
    title: "Created Event",
    isAuthenticated: req.oidc.isAuthenticated(),
    data: data,
  });
});

module.exports = router;
