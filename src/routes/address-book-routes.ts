import { Router } from "express";
import * as controller from "../controller/address-controller";
const router = Router();

router.get("/", controller.getmyAddressBook);
router.post("/", controller.postAddressBook);
router.put("/", controller.updateAddressBookEntry);
router.delete("/:id", controller.deleteEntrybyId);

export default router;

