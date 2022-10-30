import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";

export const SECRET_KEY: Secret =
  process.env.jwt_secret_key || "your-secret-key-here";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) {
      throw new Error();
    }
    console.log("got token : " + token);

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    console.log(error);
    //...if token has expired
    const expiredAt = (error as any).expiredAt;
    if (expiredAt) {
      return next(
        ApiError.clientForbidden("Token has expired at : " + expiredAt)
      );
    }
    //...for other reasons
    next(ApiError.unauthorizedResponse("Please authenticate"));
  }
};

export default auth;
