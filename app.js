import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import { APP_PORT } from "./config/index.js";
import router from "./routes/userRoutes.js";
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";

connectDB();

// Use Middlewares
app.use(express.json());
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

app.listen(APP_PORT, () => {
  console.log(` app  on port ${APP_PORT}`);
});

app.use(ErrorMiddleware);
