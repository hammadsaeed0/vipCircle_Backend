import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/database.js";
import { APP_PORT } from "./config/index.js";
import router from "./routes/userRoutes.js";
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";
import cors from "cors";
import { User } from "./model/User.js";
import ChatModel from "./model/ChatModel.js";

connectDB();

const app = express();

// Use Middlewares
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use(ErrorMiddleware);
// Import User Routes
app.use("/api", router);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "*"
  }
});


io.on("connection", (socket) => {
  socket.on("new-message", async (data) => {
    try {
      // console.log(data);
      let newMessage = await Message.create({ ...data, time: Date.now() });
      const chatMessages = await Message.find({ chat_id: data.chat_id });
      // const chatData = await ChatModel.findById(data.chatId)
      socket.broadcast.emit("new-message", {
        messages: chatMessages,
        chatId: data.chat_id,
        // persons:[chatData.person1, chatData.person2],
      });
    } catch (error) {
      console.log(error);
    }
  });
});

// Start the server
server.listen(APP_PORT, () => {
  console.log(`App is running on port ${APP_PORT}`);
});

