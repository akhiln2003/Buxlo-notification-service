import { NextFunction, Request, Response } from "express";
import { IcreateNotificationUseCase } from "../../../application/interface/common/IcreateNotificationUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class CreateNotificationController {
  constructor(private createNotificationUseCase: IcreateNotificationUseCase) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      const notification = await this.createNotificationUseCase.execute(data);

      res.status(HttpStatusCode.OK).json({ notification });
    } catch (error) {
      console.error("Error creating notification:", error);
      next(error);
    }
  };
}
