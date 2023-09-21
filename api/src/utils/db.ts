import mysql from "mysql2/promise";

import config from "./config";

const pool = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
  waitForConnections: config.dbWaitForConnections,
  connectionLimit: config.dbConnectionLimit,
  queueLimit: config.dbQueueLimit,
  multipleStatements: true,
});

pool
  .getConnection()
  .then((conn: any) => {

  })
  .catch((err: any) => {
console.log(err,"mysqlbdd")
  });

export default pool;
