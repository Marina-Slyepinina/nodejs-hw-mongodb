import { Router } from "express";
import { getAllContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactValidationSchema, updateContactValidationSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getAllContactsController));

router.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/contacts", validateBody(createContactValidationSchema), ctrlWrapper(createContactController));

router.patch("/contacts/:contactId", isValidId, validateBody(updateContactValidationSchema), ctrlWrapper(patchContactController));

router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;