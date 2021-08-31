const express = require("express");
const path = require("path");
const isProduction = !(
  process.env.NODE_ENV && process.env.NODE_ENV.match("development")
);
const API_URL = isProduction
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_API_URL;
const { createProxyMiddleware } = require("http-proxy-middleware");

console.log("APIURL is", API_URL);
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("PRODUCTION API", process.env.REACT_APP_PRODUCTION_API_URL);
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_PRODUCTION_API_URL,
      changeOrigin: true,
    })
  );
  app.use(express.static(path.join(__dirname), "/public"));
  app.use(express.static(path.join(__dirname, "/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
};
