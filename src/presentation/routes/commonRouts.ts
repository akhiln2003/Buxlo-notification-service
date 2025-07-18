import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchNotificationsController } from "../controllers/common/fetchNotifications.controller";
import { validateReqBody, validateReqQueryParams } from "@buxlo/common";
import { fetchNotificationsDto } from "../../zodSchemaDto/common/fetchnotifications.dto";
import { CreateNotificationController } from "../controllers/common/createNotification.controller";
import { createNotificationDto } from "../../zodSchemaDto/common/createnotification.dto";
import { ReadNotificationController } from "../controllers/common/readNotification.controller";
import { readnotificationsDto } from "../../zodSchemaDto/common/readnotifications.dto";

export class CommonRouts {
  private router: Router;
  private diContainer: DIContainer;

  private fetchNotificationsController!: FetchNotificationsController;
  private createNotificationController!: CreateNotificationController;
  private readNotificationController!: ReadNotificationController;

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
  }

  public getRouter(): Router {
    return this.router;
  }
}
