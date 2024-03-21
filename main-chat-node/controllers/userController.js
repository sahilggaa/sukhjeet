const userModel = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  const uniqueId = generateUniqueId(); // Call the function to get the unique ID
  const { contactNumber, name } = req.body; // Ensure you have `name` in your request body

  try {
    const userImage = req.file.path;
    const user = await userModel.create({
      id: uniqueId,
      contactNumber,
      name,
      userImage,
    });

    if (user) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "6h" } // Token expiry time
      );

      res.status(200).json({
        status: "Success",
        message: "User Created Successfully",
        data: user,
        token, // Include token in the response
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" }); // Sending error response
  }
};

const generateUniqueId = () => {
  // Call uuidv4 function to generate a unique ID
  return uuidv4();
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findByPk(userId);

    if (user) {
      const { contactNumber } = user;

      // Store contactNumber in app.locals
      req.app.locals.contactNumberMap =
        req.app.locals.contactNumberMap || new Map();
      req.app.locals.contactNumberMap.set(userId, contactNumber);
      console.log(req.app.locals.contactNumberMap);

      // User found, send it as JSON response
      res.status(200).json({
        status: "Success",
        message: "User found",
        data: user,
      });
    } else {
      // User not found, send 404 error
      res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }
  } catch (error) {
    // Error occurred while fetching user, send 500 error
    console.error("Error fetching user:", error);
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const getUserByPhoneNumber = async (req, res) => {
  try {
    const contactNumber = req.query.contactNumber; // Extract contactNumber from query parameters
    const user = await userModel.findOne({ where: { contactNumber } });

    if (user) {
      // Store contactNumber in app.locals
      req.app.locals.contactNumberMap =
        req.app.locals.contactNumberMap || new Map();
      req.app.locals.contactNumberMap.set(user.id, user.contactNumber);
      console.log(req.app.locals.contactNumberMap);

      // User found, send it as JSON response
      res.status(200).json({
        status: "Success",
        message: "User found",
        data: user,
      });
    } else {
      // User not found, send 404 error
      res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }
  } catch (error) {
    // Error occurred while fetching user, send 500 error
    console.error("Error fetching user:", error);
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByPhoneNumber,
};
