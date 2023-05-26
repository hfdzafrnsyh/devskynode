require('dotenv').config()

module.exports = {
    "development": {
      "username": `${process.env.MYSQL_USER}`,
      "password": `${process.env.MYSQL_ROOT_PASSWORD}`,
      "database": `${process.env.MYSQL_DBNAME}`,
      "host": `${process.env.MYSQL_HOST}`,
      "dialect": "mysql"
    },
    "test": {
      "username": `${process.env.MYSQL_USER}`,
      "password": `${process.env.MYSQL_ROOT_PASSWORD}`,
      "database": `${process.env.MYSQL_DBNAME_TEST}`,
      "host": `${process.env.MYSQL_HOST}`,
      "dialect": "mysql"
    },
    "production": {
      "username": `${process.env.MYSQL_USER}`,
      "password": `${process.env.MYSQL_ROOT_PASSWORD}`,
      "database": `${process.env.MYSQL_DBNAME}`,
      "host": `${process.env.MYSQL_HOST}`,
      "dialect": "mysql"
    }
  }
