import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchNotificationsController } from "../controllers/common/fetchNotifications.controller";
import { validateReqBody, validateReqQueryParams } from "@buxlo/common";
import { fetchNotificationsDto } from "../../zodSchemaDto/common/fetchnotifications.dto";
import { CreateNotificationController } from "../controllers/common/createNotification.controller";
import { createNotificationDto } from "../../zodSchemaDto/common/createnotification.dto";
import { ReadNotificationController } from "../controllers/common/readNotification.controller";
import { readnotificationsDto } from "../../zodSchemaDto/common/readnotifications.dto";
import { deleteNotificationsDto } from "../../zodSchemaDto/common/deleteNotification.dto.";
import { DeleteNotificationController } from "../controllers/common/deleteNotification.controller";

export class CommonRouts {
  private router: Router;
  private diContainer: DIContainer;

  private fetchNotificationsController!: FetchNotificationsController;
  private createNotificationController!: CreateNotificationController;
  private readNotificationController!: ReadNotificationController;
  private deleteNotificationControler!: DeleteNotificationController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.fetchNotificationsController = new FetchNotificationsController(
      this.diContainer.fetchNotificationsUseCase()
    );
    this.createNotificationController = new CreateNotificationController(
      this.diContainer.createNotificationUseCase()
    );
    this.readNotificationController = new ReadNotificationController(
      this.diContainer.readNotificationUseCase()
    );
    this.deleteNotificationControler = new DeleteNotificationController(
      this.diContainer.deleteNotificationUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post(
      "/createnotification",
      validateReqBody(createNotificationDto),
      this.createNotificationController.create
    );
    this.router.get(
      "/fetchnotifications",
      validateReqQueryParams(fetchNotificationsDto),
      this.fetchNotificationsController.get
    );
    this.router.patch(
      "/readnotifications",
      validateReqBody(readnotificationsDto),
      this.readNotificationController.read
    );
    this.router.delete(
      "/deletenotifications",
      validateReqBody(deleteNotificationsDto),
      this.deleteNotificationControler.delete
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
