const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/school_payment';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});n
module.exports = { sequelize };
