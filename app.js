const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const { getAllNews, getSingleNews, getNewsByType } = require("./controllers/blog.controller");
require("dotenv/config");

const app = express();
const router = express.Router();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

app.use("/api/v1", router);

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Blog Mock API" });
});
router.get("/news", getAllNews);
router.get("/news/:slug", getSingleNews);
router.get("/news/type/:type", getNewsByType);

module.exports = app;
