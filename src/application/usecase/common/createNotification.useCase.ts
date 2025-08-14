import { NotificationEntities } from "../../../domain/entities/notification";
import { InotificationRepository } from "../../../infrastructure/@types/InotificationRepository";
import { IcreateNotificationUseCase } from "../../interface/common/IcreateNotificationUseCase";
import { BadRequest } from "@buxlo/common";

export class CreateNotificationUseCase implements IcreateNotificationUseCase {
  constructor(private _notificationRepo: InotificationRepository) {}
  async execute(data: NotificationEntities): Promise<NotificationEntities> {
    try {
      return await this._notificationRepo.create(data);
    } catch (error) {
      console.error("Error in CreateNotificationUseCase:", error);
      throw new BadRequest("Failed to create notification");
    }
  }
}
