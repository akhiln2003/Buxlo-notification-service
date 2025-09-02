import { ICreateNotificationUseCase } from "../../application/interface/common/ICreateNotificationUseCase";
import { IDeleteNotificationUseCase } from "../../application/interface/common/IDeleteNotificationUseCase";
import { IFetchDataFromS3UseCase } from "../../application/interface/common/IFetchDataFromS3UseCase";
import { IFetchNotificationsUseCase } from "../../application/interface/common/IFetchNotificationsUseCase";
import { IReadNotificationUseCase } from "../../application/interface/common/IReadNotificationUseCase";
import { CreateNotificationUseCase } from "../../application/usecase/common/createNotification.useCase";
import { DeleteNotificationUseCase } from "../../application/usecase/common/deleteNotification.useCase";
import { FetchDataFromS3UseCase } from "../../application/usecase/common/fetchDataFromS3.UseCase";
import { FetchNotificationsUseCase } from "../../application/usecase/common/fetchNotifications.UseCase";
import { ReadNotificationUseCase } from "../../application/usecase/common/readNotification.useCase";
import { IS3Service } from "../@types/IS3Service";
import { S3Service } from "../external-services/s3-client";
import { NotificationRepository } from "../repositories/notification.Repository";

export class DIContainer {
  private _s3Service: IS3Service;
  private _notificationRepo: NotificationRepository;

  constructor() {
    this._s3Service = new S3Service();
    this._notificationRepo = new NotificationRepository();
  }

  fetchDataFromS3UseCase(): IFetchDataFromS3UseCase {
    return new FetchDataFromS3UseCase(this._s3Service);
  }

  createNotificationUseCase(): ICreateNotificationUseCase {
    return new CreateNotificationUseCase(this._notificationRepo);
  }

  fetchNotificationsUseCase(): IFetchNotificationsUseCase {
    return new FetchNotificationsUseCase(this._notificationRepo);
  }
  readNotificationUseCase(): IReadNotificationUseCase {
    return new ReadNotificationUseCase(this._notificationRepo);
  }
  deleteNotificationUseCase(): IDeleteNotificationUseCase {
    return new DeleteNotificationUseCase(this._notificationRepo);
  }
}
