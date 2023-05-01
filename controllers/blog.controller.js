const httpStatus = require("http-status");
const allNews = require("../store/data.json");

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

  const related_news = getRelatedNews(singleNews);

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Returned news successfully",
    result: {
      data: singleNews,
      related_news: related_news
    },
  });
};

const getNewsByType = (req, res) => {
  const type = req.params.type;
  const category = req.query.category;
  let news = [];

  news = allNews.filter((_news) => _news.type === type)

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

const getRelatedNews = (news) => {
  return allNews.filter((_news) => _news.category === news.category && _news.id !== news.id && _news.type === news.type);
};

module.exports = { getAllNews, getSingleNews, getNewsByType };
