const axios = require("axios");

/* HTTP Request - Async Promise */
exports.httpRequest = async (method, url, headers, data) => {
  const wait = new Promise((resolve, reject) => {
    try {
      let response = axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
      });
      resolve(response);
    } catch (err) {
      logger.error(err);
    }
  });

  let payload = await wait
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });

  return payload ? payload : null;
};

/* DB Url for HTTP Request */
exports.DBUrl = (extendURL) => {
  return `http://${process.env.DB_HOST}:${process.env.PORT}/${extendURL}`;
};
