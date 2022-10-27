import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import apiErroHandler from "./error/ErrorHandler";
import router from "./routes/address_book";
const app = express();
app.use(bodyParser.json());
app.use(router);
app.use(apiErroHandler);

mongoose
  .connect(process.env.mongodb_URL || "mongodb://localhost:27017/address_book")
  .then(() => {
    app.listen(process.env.PORT||3000);
  })
  .catch((err) => {
    console.log(err);
  });
