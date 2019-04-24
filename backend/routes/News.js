const db = require("../db");
const asyncHandler = require("express-async-handler");

const getNews = asyncHandler(async (req, res) => {
  // Get database connection-pool-object.
  const pool = db.getPool();
  // Which columns to SELECT.
  const columns = "news.title, news.body, news.created_at, news.updated_at, news.updated_at, user.first_name, user.last_name, user.avatar_url";
  // Await query on news and user tables.
  const [news] = await pool.query(
    `SELECT ${columns} FROM news JOIN user ON news.user_id = user.id`
  );
  // Respond with list of news-data.
  return res.json(news);
});

module.exports = getNews;