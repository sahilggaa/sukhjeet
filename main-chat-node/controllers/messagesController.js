const messageModel = require("../models/messages");
const { v4: uuidv4 } = require("uuid");

const storeMessage = async (req, res) => {
  const uniqueId = generateUniqueId();
  const { content, roomId, senderContact, recieverContact } = req.body;

  try {
    const messageCreate = await messageModel.create({
      id: uniqueId,
      content,
      roomId,
      senderContact,
      recieverContact,
    });
    if (messageCreate) {
      res.status(200).json({
        status: success,
        message: "Message stored successfully.",
        data: messageCreate,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
  const generateUniqueId = () => {
    // Call uuidv4 function to generate a unique ID
    return uuidv4();
  };
};
module.exports = storeMessage;
