import express from "express";
import { APP_PORT, MONGO_URL } from "./config";
import mongoose from "mongoose";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";


const app = express();
// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});

app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`Server is start on Port ${APP_PORT}`));
