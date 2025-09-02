import { NextFunction, Request, Response } from "express";
import { IDeleteNotificationUseCase } from "../../../application/interface/common/IDeleteNotificationUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class DeleteNotificationController {
  constructor(private _deleteNotificationUseCase: IDeleteNotificationUseCase) {}
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.body;

      const response = await this._deleteNotificationUseCase.execute(ids);
      res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      next(error);
    }
  };
}
