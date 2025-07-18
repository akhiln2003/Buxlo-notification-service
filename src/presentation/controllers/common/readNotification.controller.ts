import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IreadNotificationUseCase } from "../../../application/interface/common/IreadNotificationUseCase";

export class ReadNotificationController {
  constructor(private readNotificationUseCase: IreadNotificationUseCase) {}

  read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { updates } = req.body;
      const result = await this.readNotificationUseCase.execute(updates);

      res.status(HttpStatusCode.OK).json({ result });
    } catch (error) {
      console.error("Error reading notifications:", error);
      next(error);
    }
  };
}
