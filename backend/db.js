const assert = require("assert");
const mysql = require("mysql2");

let _connection;

async function init() {
  return new Promise((resolve, reject) => {

    if (_connection) {
      console.warn("Trying to init DB again!");
      return callback(null, _connection);
    }

    // The MySQL connection.
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'ludum_db'
    });

    // Connects to MySQL.
    connection.connect(connected);

    function connected(err) {
      if (err) {
        return reject(err);
      }
      console.log("Connected to MySQL database!");
      _connection = connection;
      return resolve(_connection);
    }

  })
};

function getConnection() {
  assert.ok(_connection, "Db has not been initialized. Please call init first.");
  return _connection;
}

module.exports = {
  getConnection,
  init
};