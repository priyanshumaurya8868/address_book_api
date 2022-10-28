
import { Router } from "express";
import * as controller from '../controller/auth-controler'
const authRouter = Router();

authRouter.post("/signin",controller.login);
authRouter.post("/signup", controller.signup)

export default authRouter;