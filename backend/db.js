const assert = require("assert");
const mysql = require("mysql2/promise");

let _pool;

async function init() {
  if (_pool) {
    console.warn("Trying to init DB again!");
    return _pool;
  }

  // Create the connection pool for the MySQL database.
  _pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password", // TODO: Change password to ENV-variable.
    database: "ludum_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Test database connection by sending ping query.
  await _pool.query("SELECT * FROM user WHERE first_name = 'ping'");

  console.log("Successfully connected to database!");
  return _pool;
}

function getPool() {
  assert.ok(_pool, "Db has not been initialized. Please call init first.");
  return _pool;
}

module.exports = {
  getPool,
  init
};