import { NextFunction, Request, Response } from "express";
import { ICreateNotificationUseCase } from "../../../application/interface/common/ICreateNotificationUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class CreateNotificationController {
  constructor(private _createNotificationUseCase: ICreateNotificationUseCase) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      const notification = await this._createNotificationUseCase.execute(data);

      res.status(HttpStatusCode.OK).json({ notification });
    } catch (error) {
      console.error("Error creating notification:", error);
      next(error);
    }
  };
}
