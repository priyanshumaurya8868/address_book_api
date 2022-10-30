import { Router } from "express";
import * as controller from "../controller/address-controller";
const router = Router();

router.get("/", controller.getmyAddressBook);
router.get("/:id", controller.getEntrybyId);
router.post("/", controller.postAddressBook);
router.post("/bulk", controller.postAddressBookentriesInBulk);
router.put("/", controller.updateAddressBookEntry);
router.delete("/:id", controller.deleteEntrybyId);

export default router;

