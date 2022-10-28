import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import apiErroHandler from "./error/ErrorHandler";
import authRouter from "./routes/auth-routes";
import controller from "./routes/address-book-routes";
import ApiError from "./error/ApiError";
import auth from "./middleware/auth-middleware";
const app = express();
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/addressbook",auth,controller);
app.use((_req, _res, next) =>
  next(ApiError.resourceNotFound("route not foundd!!"))
);
app.use(apiErroHandler);

mongoose
  .connect(process.env.mongodb_URL || "mongodb://localhost:27017/address_book")
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
