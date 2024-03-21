const { Sequelize } = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Socket.IO initialized with HTTP server
const cors = require("cors");
app.use(cors());

const userModel = require("./models/users");
require("dotenv").config();

// const messageController = require("./controllers/messagesController");

const MYSQL_host = process.env.MYSQL_HOST;
const MySQL_user = process.env.MYSQL_USER;
const MYSQL_password = process.env.MYSQL_PASSWORD;
const MYSQL_database = process.env.MYSQL_DB;

// MySQL connection
const sequelize = new Sequelize(
  MYSQL_database,
  MySQL_user,
  MYSQL_password,
  {
    dialect: "mysql",
    host: MYSQL_host,
  },
  () => {}
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    console.log(`Connected to ${MYSQL_database}`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Middleware
app.use(bodyParser.json());

app.use(express.static("public"));

// Routes
app.use("/api", userRoutes);

// Socket.IO logic

var roomId = 1;
var full = 0;
var roomIdentifier = "";
io.on("connection", function (socket) {
  console.log("A user connected.");

  socket.on("joinRoom", async (contactNumber) => {
    try {
      const user = await userModel.findOne({
        where: { contactNumber: contactNumber },
      });

      // console.log(user);
      if (user) {
        const userName = user.name;
        const contactNumber = user.contactNumber;
        console.log(contactNumber);
        roomIdentifier = `room-${roomId}`;
        socket.join(roomIdentifier);
        console.log(`User ${contactNumber} joined  ${roomIdentifier}`);

        // Emit an event to the client to acknowledge successful room join
        io.sockets.in(roomIdentifier).emit("joinRoomResponse", {
          success: true,
          message: `${user.name} Joined room ${roomIdentifier}`,
          user,
        });
        full++;
        //   Check room size and increment roomId if necessary
        if (full >= 2) {
          full = 0;
          roomId++;
        }
      } else {
        // console.log(socket.contactNumber);
        console.log(`User with contact ${contactNumber} not found`);
      }
    } catch (error) {
      console.log(error);
    }
  });
  // Handle sending messages
  socket.on("sendMessage", (contactNumber, message) => {
    // Broadcast the message to all clients in the room along with the user ID

    io.to(roomIdentifier).emit("receiveMessage", { contactNumber, message });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`A user disconnected.`);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// server.listen();
