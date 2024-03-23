const messageModel = require("../models/messages");
const { v4: uuidv4 } = require("uuid");

const generateUniqueId = () => {
  // Call uuidv4 function to generate a unique ID
  return uuidv4();
};

const storeMessage = async ({ contactNumber, message, roomId }) => {
  const uniqueId = generateUniqueId();

  try {
    const messageCreate = await messageModel.create({
      id: uniqueId,
      contactNumber,
      message,
      roomId,
    });
    if (messageCreate) {
      console.log("Message stored successfully:", messageCreate);
      return messageCreate; // Return the created message
    }
  } catch (error) {
    console.error("Error storing message:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

module.exports = {
  storeMessage: storeMessage,
};
