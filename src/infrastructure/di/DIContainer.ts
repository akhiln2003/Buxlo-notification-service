import { IcreateNotificationUseCase } from "../../application/interface/common/IcreateNotificationUseCase";
import { IfetchDataFromS3UseCase } from "../../application/interface/common/IfetchDataFromS3UseCase";
import { IfetchNotificationsUseCase } from "../../application/interface/common/IfetchNotificationsUseCase";
import { IreadNotificationUseCase } from "../../application/interface/common/IreadNotificationUseCase";
import { CreateNotificationUseCase } from "../../application/usecase/common/createNotification.useCase";
import { FetchDataFromS3UseCase } from "../../application/usecase/common/fetchDataFromS3.UseCase";
import { FetchNotificationsUseCase } from "../../application/usecase/common/fetchNotifications.UseCase";
import { ReadNotificationUseCase } from "../../application/usecase/common/readNotification.useCase";
import { Is3Service } from "../@types/Is3Service";
import { S3Service } from "../external-services/s3-client";
import { NotificationRepository } from "../repositories/notification.Repository";

export class DIContainer {
  private _s3Service: Is3Service;
  private _notificationRepo: NotificationRepository;

  constructor() {
    this._s3Service = new S3Service();
    this._notificationRepo = new NotificationRepository();
  }

  fetchDataFromS3UseCase(): IfetchDataFromS3UseCase {
    return new FetchDataFromS3UseCase(this._s3Service);
  }

  createNotificationUseCase(): IcreateNotificationUseCase {
    return new CreateNotificationUseCase(this._notificationRepo);
  }

  fetchNotificationsUseCase(): IfetchNotificationsUseCase {
    return new FetchNotificationsUseCase(this._notificationRepo);
  }
  readNotificationUseCase():IreadNotificationUseCase{
    return new ReadNotificationUseCase(this._notificationRepo);
  }
}
