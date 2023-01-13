import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleError } from "./errors/handleError";
import { loginRouter } from "./routes/login.routes";
import { usersRouter } from "./routes/users.routes";
import { astrosRoutes } from "./routes/astros.routes";

export const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
// app.use("/favoritePosts");
// app.use("/posts");
app.use("/astros", astrosRoutes);
// app.use("/categories");
// app.use("/quiz");
// app.use("/questions");
// app.use("/options");
// app.use("/extras");
// app.use("/types");

app.use(handleError);
