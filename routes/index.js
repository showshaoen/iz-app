const { default: axios } = require("axios");
const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

var common = require("../services/common");

// auth0 tutorial:

// req.isAuthenticated is provided from the auth router
router.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render("index", {
    title: "Home",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

router.get("/dashboard", requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken;

  try {
    const apiResponse = await axios.get(
      "http://localhost:5000/schedules/private",
      {
        headers: {
          authorization: `${token_type} ${access_token}`,
        },
      }
    );
    data = apiResponse.data;
  } catch (err) {
    // console.log(err);
  }
  res.render("dashboard", {
    title: "Dashboard",
    isAuthenticated: req.oidc.isAuthenticated,
    user: req.oidc.user,
    data,
  });
});

router.get("/getDaily/:type/:date", requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken;
  let headers = {
    authorization: `${token_type} ${access_token}`,
  };

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
