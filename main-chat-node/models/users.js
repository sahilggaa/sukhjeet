// models/User.js
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
  }
);

const users = sequelize.define("users", {
  id: {
    type: DataTypes.STRING(32),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  contactNumber: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },

  userImage: {
    type: DataTypes.STRING,
  },

  createdAt: {
    type: DataTypes.STRING,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.STRING,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

module.exports = users;
