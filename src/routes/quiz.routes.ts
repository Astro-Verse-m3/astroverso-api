import { Router } from "express";

import { deleteQuizController } from "../controllers/quiz/deleteQuiz.controller";
import { listQuizzesController } from "../controllers/quiz/listQuizzes.controller";
import { updateQuizController } from "../controllers/quiz/updateQuiz.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { createQuizSchema, updateQuizSchema } from "../schemas/quiz.schema";
import { createQuizController } from "../controllers/quiz/createQuiz.controller";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";
import { ensureQuizExistsMiddleware } from "../middlewares/quiz/ensureQuizExists.middleware";

export const quizzesRouter = Router();

quizzesRouter.post(
	"",
	AuthMiddleware,
	isAdmMiddleware,
	dataIsValidMiddleware(createQuizSchema),
	createQuizController
);
quizzesRouter.get("", AuthMiddleware, isAdmMiddleware, listQuizzesController);

quizzesRouter.patch(
	"/:id",
	AuthMiddleware,
	isAdmMiddleware,
	idIsValidMiddleware,
	isValidToUpdateMiddleware,
	ensureQuizExistsMiddleware,
	dataIsValidMiddleware(updateQuizSchema),
	updateQuizController
);
quizzesRouter.delete(
	"/:id",
	AuthMiddleware,
	isAdmMiddleware,
	idIsValidMiddleware,
	ensureQuizExistsMiddleware,
	deleteQuizController
);
