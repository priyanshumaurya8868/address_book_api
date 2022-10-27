import { Router } from "express";
import * as controller from '../controller/auth-controler'
const router = Router();

router.post("/signin",controller.login);
router.post("/signup", controller.signup);

export default router;
