const Sequelize = require('sequelize');
require('dotenv').config();
const db = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

module.exports = db;