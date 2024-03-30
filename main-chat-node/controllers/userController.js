const userModel = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const speakeasy = require("speakeasy");

const generateOTP = () => {
  return speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    encoding: "base32",
    step: 30, // OTP refresh time in seconds
    digits: 6, // OTP length
  });
};

const createUser = async (req, res) => {
  const uniqueId = generateUniqueId(); // Generate unique ID
  const { contactNumber, name } = req.body; // Extract contact number and name from request body

  try {


    const userImage = req.file.path;
    const fileName = userImage.split("\\").pop();
    console.log(fileName);
    // Function to generate OTP

    // Generate OTP
    const otp = generateOTP();
    console.log(otp);
    // Create user with OTP
    const user = await userModel.create({
      id: uniqueId,
      contactNumber,
      name,
      userImage: fileName,
      signUpOtp: otp, // Store OTP in the database
    });

    if (user) {
      // Send response with user data and token
      res.status(200).json({
        status: "Success",
        message: "User Created Successfully",
        data: user,
        otp,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

//Login User and Authenticating otp

const authenticateOtpApi = async (req, res) => {
  try {
    const { contactNumber, signUpOtp } = req.body;
    console.log(signUpOtp);

    const user = await userModel.findOne({ where: { contactNumber } });

    if (user) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "10s" } // Token expiry time
      );
      if (signUpOtp === user.signUpOtp) {
        res.status(200).json({
          status: "success",
          message: "User Authenticated successfully",
          user,
          token,
        });
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "Authentication failed",
        });
      }
    } else {
      res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
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
    const user = await userModel.findOne({
      where: { contactNumber, signUpOtp },
    });

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
      message: error,
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByPhoneNumber,
  authenticateOtpApi,
};

