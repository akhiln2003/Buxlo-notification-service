import { NotificationEntities } from "../../../domain/entities/notification";
import {
  NotificationMapper,
  NotificationResponseDto,
} from "../../../domain/zodSchemaDto/output/notificationResponse.dto";
import { INotificationRepository } from "../../../infrastructure/@types/INotificationRepository";
import { ICreateNotificationUseCase } from "../../interface/common/ICreateNotificationUseCase";
import { BadRequest } from "@buxlo/common";

export class CreateNotificationUseCase implements ICreateNotificationUseCase {
  constructor(private _notificationRepo: INotificationRepository) {}
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
