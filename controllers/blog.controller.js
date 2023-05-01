const httpStatus = require("http-status");
const bbcNews = require("../store/bbc.json");
const cnnNews = require("../store/cnn.json");
const allNews = [...bbcNews, ...cnnNews];

const getAllNews = (req, res) => {
  const category = req.query.category;
  let news = allNews;

  if (category) {
    news = getNewsByCategory(allNews, category);
  }

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Returned news successfully",
    result: news,
  });
};

const getSingleNews = (req, res) => {
  const slug = req.params.slug;
  const singleNews = allNews.find((news) => news.slug === slug);

  if (!singleNews) {
    return res.status(httpStatus.NOT_FOUND).send({
      success: false,
      message: "News not found",
    });
  }

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Returned news successfully",
    result: singleNews,
  });
};

const getNewsByType = (req, res) => {
  const type = req.params.type;
  const category = req.query.category;
  let news = [];

  if (type == "bbc") {
    news = bbcNews;
  } else if (type == "cnn") {
    news = cnnNews;
  }

  if (category) {
    news = getNewsByCategory(news, category);
  }

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Returned news successfully",
    result: news,
  });
};

const getNewsByCategory = (news, category) => {
  return news.filter((_news) => _news.category === category);
};

module.exports = { getAllNews, getSingleNews, getNewsByType };
