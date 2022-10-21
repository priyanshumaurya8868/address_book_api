import { NextFunction, Request, Response } from "express";
import ApiError from "./ApiError";

function apiErroHandler(err : any , req : Request, res : Response, next : NextFunction) {
  // in prod, don't use console.log or console.err because
  // it is not async
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json({
      status: "Failure",
      message : err.message
    });
    return;
  }

  res.status(500).json({
    status: "Failure",
    message :err._message?? err.message??"something went wrong!"
  });
}

export default apiErroHandler;
