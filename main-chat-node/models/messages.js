const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

// Define message model
const Message = sequelize.define("Message", {
  id: {
    primaryKey: true, // Correct syntax for primaryKey
    type: DataTypes.UUID, // Assuming you want to use UUID for primary key
    defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
    allowNull: false,
    unique: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes, // Use DataTypes instead of Sequelize
    allowNull: false,
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE, // Use DATE for createdAt and updatedAt fields
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

// Sync the model with the database
// (async () => {
//   try {
//     await sequelize.sync({ alter: true }); // Sync the model with the database, alter: true will update the table structure if necessary
//     console.log("Database synchronized");
//   } catch (error) {
//     console.error("Error syncing database:", error);
//   }
// })();

module.exports = Message; // Export the model
