import { Router } from "express";
import { createTypesController, deleteTypesController, listTypesController, updateTypesController } from "../controllers/types/listTypes.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";
import { typesRequestSchema } from "../schemas/types.schema";

export const typesRouter = Router();

typesRouter.post(
    "",
    AuthMiddleware,
    isAdmMiddleware,
    dataIsValidMiddleware(typesRequestSchema),
    createTypesController
  );
  typesRouter.get("", listTypesController);
  typesRouter.patch(
    "/:id",
    AuthMiddleware,
    isAdmMiddleware,
    dataIsValidMiddleware(typesRequestSchema),
    idIsValidMiddleware,
    isValidToUpdateMiddleware,
    updateTypesController
  );
  typesRouter.delete(
    "/:id",
    AuthMiddleware,
    isAdmMiddleware,
    idIsValidMiddleware,
    deleteTypesController
  );


