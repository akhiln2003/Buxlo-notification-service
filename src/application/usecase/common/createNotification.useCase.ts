import { NotificationEntities } from "../../../domain/entities/notification";
import {
  NotificationMapper,
  NotificationResponseDto,
} from "../../../domain/zodSchemaDto/output/notificationResponse.dto";
import { InotificationRepository } from "../../../infrastructure/@types/InotificationRepository";
import { IcreateNotificationUseCase } from "../../interface/common/IcreateNotificationUseCase";
import { BadRequest } from "@buxlo/common";

export class CreateNotificationUseCase implements IcreateNotificationUseCase {
  constructor(private _notificationRepo: InotificationRepository) {}
  async execute(data: NotificationEntities): Promise<NotificationResponseDto> {
    try {
      const newData = await this._notificationRepo.create(data);
      return NotificationMapper.toDto(newData);
    } catch (error) {
      console.error("Error in CreateNotificationUseCase:", error);
      throw new BadRequest("Failed to create notification");
    }
  }
}
