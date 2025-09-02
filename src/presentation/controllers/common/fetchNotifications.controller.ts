import { NextFunction, Request, Response } from "express";
import { IFetchNotificationsUseCase } from "../../../application/interface/common/IFetchNotificationsUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchNotificationsController {
  constructor(private _fetchNotificationsUseCase: IFetchNotificationsUseCase) {}
  get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, page, status, searchData } = req.query;

      const { notifications, totalPages } =
        await this._fetchNotificationsUseCase.execute(
          userId as string,
          Number(page),
          status as "all" | "unread",
          searchData as string | undefined
        );

      res.status(HttpStatusCode.OK).json({ notifications, totalPages });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      next(error);
    }
  };
}
