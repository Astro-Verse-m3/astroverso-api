import { AppError } from "../../errors/AppErrors";
import { Options } from "../../entities/options.entity";
import { NextFunction, Request, Response } from "express";
import dataSource from "../../data-source";

export const verifyOptionIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myTable = dataSource.getRepository(Options);

    const find = await myTable.findOneBy({
      id: req.params.id,
    });

    if (!find) {
      throw new AppError("Option Id Not exists", 404);
    }

    next();
  } catch (error) {
    throw new AppError(error as string);
  }
};
