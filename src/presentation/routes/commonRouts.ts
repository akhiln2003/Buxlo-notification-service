import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchNotificationsController } from "../controllers/common/fetchNotifications.controller";
import { validateReqBody, validateReqQueryParams } from "@buxlo/common";
import { CreateNotificationController } from "../controllers/common/createNotification.controller";
import { ReadNotificationController } from "../controllers/common/readNotification.controller";
import { DeleteNotificationController } from "../controllers/common/deleteNotification.controller";
import { createNotificationDto } from "../../zodSchemaDto/input/common/createnotification.dto";
import { fetchNotificationsDto } from "../../zodSchemaDto/input/common/fetchnotifications.dto";
import { readnotificationsDto } from "../../zodSchemaDto/input/common/readnotifications.dto";
import { deleteNotificationsDto } from "../../zodSchemaDto/input/common/deleteNotification.dto.";

export class CommonRouts {
  private _router: Router;
  private _diContainer: DIContainer;

  private _fetchNotificationsController!: FetchNotificationsController;
  private _createNotificationController!: CreateNotificationController;
  private _readNotificationController!: ReadNotificationController;
  private _deleteNotificationControler!: DeleteNotificationController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._fetchNotificationsController = new FetchNotificationsController(
      this._diContainer.fetchNotificationsUseCase()
    );
    this._createNotificationController = new CreateNotificationController(
      this._diContainer.createNotificationUseCase()
    );
    this._readNotificationController = new ReadNotificationController(
      this._diContainer.readNotificationUseCase()
    );
    this._deleteNotificationControler = new DeleteNotificationController(
      this._diContainer.deleteNotificationUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post(
      "/createnotification",
      validateReqBody(createNotificationDto),
      this._createNotificationController.create
    );
    this._router.get(
      "/fetchnotifications",
      validateReqQueryParams(fetchNotificationsDto),
      this._fetchNotificationsController.get
    );
    this._router.patch(
      "/readnotifications",
      validateReqBody(readnotificationsDto),
      this._readNotificationController.read
    );
    this._router.delete(
      "/deletenotifications",
      validateReqBody(deleteNotificationsDto),
      this._deleteNotificationControler.delete
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
