//mysql配置
const mysql = require("yamlling-node-mysql");
const mysqlInit = new mysql({
  host: "120.25.254.157",
  user: "root",
  password: "root",
  database: "vaccines",
  port: 3306,
  timezone: "08:00",
});

module.exports = mysqlInit;
