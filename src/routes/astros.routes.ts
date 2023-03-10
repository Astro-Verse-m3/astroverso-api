import { Router } from "express";
import {
  astrosRequestSchema,
  astrosUpdateSchema,
} from "../schemas/astros.schema";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { listAstrosController } from "../controllers/astros/listAstros.controller";
import { createAstrosController } from "../controllers/astros/createAstros.controller";
import { updateAstrosController } from "../controllers/astros/updateAstros.controller";
import { deleteAstrosController } from "../controllers/astros/deleteAstros.controller";
import { updateAstrosExistsMiddleware } from "../middlewares/astros/updateAstrosExists.middleware";
import { ensureAstrosExistsMiddleware } from "../middlewares/astros/ensureAstrosExists.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";

export const astrosRouter = Router();

astrosRouter.post(
  "",
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(astrosRequestSchema),
  createAstrosController
);

astrosRouter.get("", listAstrosController);

astrosRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  isValidToUpdateMiddleware,
  dataIsValidMiddleware(astrosUpdateSchema),
  updateAstrosExistsMiddleware,
  updateAstrosController
);

astrosRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  ensureAstrosExistsMiddleware,
  deleteAstrosController
);
