import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/database.js";
import { APP_PORT } from "./config/index.js";
import router from "./routes/userRoutes.js";
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";
import cors from "cors";

connectDB();

const app = express();
const server = http.createServer(app);

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

// Import User Routes
app.use("/api", router);
let activeUsers = [];
const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });
  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });
  // send message to a specific user
  socket.on("send-message", (data) => {
    // console.log(data);
    // console.log("Data: ", data)
      io.emit("recieve-message", data);
  });
});

// Start the server
server.listen(APP_PORT, () => {
  console.log(`App is running on port ${APP_PORT}`);
});

app.use(ErrorMiddleware);
