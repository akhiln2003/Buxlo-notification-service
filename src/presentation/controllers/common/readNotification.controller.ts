import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IReadNotificationUseCase } from "../../../application/interface/common/IReadNotificationUseCase";

export class ReadNotificationController {
  constructor(private _readNotificationUseCase: IReadNotificationUseCase) {}

  read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { updates } = req.body;
      const result = await this._readNotificationUseCase.execute(updates);

      res.status(HttpStatusCode.OK).json({ result });
    } catch (error) {
      console.error("Error reading notifications:", error);
      next(error);
    }
  };
}
