import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.body.name;
  const password = req.body.password;

  const foundUser = await UserModel.findOne({ name: name });
  if (!foundUser) {
    return next(ApiError.unauthorizedResponse("Invalid login or Password!")); //confunsing hackers ;)
  }
  const isMatch = bcrypt.compareSync(password, foundUser!.password);
  if (!isMatch) {
    return next(ApiError.unauthorizedResponse("Invalid login or Password!"));
  }
  const token = getToken(foundUser._id.toString(), name);
  res.status(200).json({ name: foundUser.name, userId: foundUser._id, token });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.body.name || "";
  const password = req.body.password || "";

  //...validation
  if (name.length === 0) {
    return next(ApiError.unprocessableEntity("name can't be empty!!"));
  }
  if (password.length < 6) {
    return next(
      ApiError.unprocessableEntity(
        "password can't be less than of 6 characters!!"
      )
    );
  }
  const foundUser = await UserModel.findOne({ name: name });
  if (foundUser) {
    return next(
      ApiError.resourceConflict("User with this username already exists!")
    ); //confunsing hackers ;)
  }
  //...save
  const user = await new UserModel({ name, password }).save();
  console.log("*********");
  console.log(user);
  const token = getToken(user._id, name);
  res.status(200).json({ userId: user._id, name, token });
};
function getToken(_id: string, name: string) {
  return jwt.sign(
    { _id, name },
    process.env.jwt_secret_key || "your-secret-key-here",
    {
      expiresIn: "1h",
    }
  );
}
