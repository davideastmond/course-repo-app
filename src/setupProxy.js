const express = require("express");
const path = require("path");
const cors = require("cors");
const isProduction = !(
  process.env.NODE_ENV && process.env.NODE_ENV.match("development")
);
const API_URL = isProduction
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_API_URL;
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const corsOptions = {
    origin: API_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
    credentials: true,
  };

  app.options("*", cors(corsOptions));
  app.use(cors(corsOptions));

  app.use(
    "/api",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );
  if (isProduction) {
    app.use(express.static(path.join(__dirname, "/build")));
    app.get("*", (req, res, next) => {
      res.sendFile(path.join(__dirname + "/build/index.html"));
    });
  }
};
