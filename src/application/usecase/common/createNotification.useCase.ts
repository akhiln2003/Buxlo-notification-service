import {
  NotificationMapper,
  NotificationResponseDto,
} from "../../dto/notificationResponse.dto";
import { INotificationRepository } from "../../../infrastructure/@types/INotificationRepository";
import {
  ICreateNotificationUseCase,
  ICreateNotificationUseCaseProps,
} from "../../interface/common/ICreateNotificationUseCase";
import { BadRequest } from "@buxlo/common";

export class CreateNotificationUseCase implements ICreateNotificationUseCase {
  constructor(private _notificationRepo: INotificationRepository) {}
  async execute(
    data: ICreateNotificationUseCaseProps
  ): Promise<NotificationResponseDto> {
    try {
      const newData = await this._notificationRepo.create(data);
      return NotificationMapper.toDto(newData);
    } catch (error) {
      console.error("Error in CreateNotificationUseCase:", error);
      throw new BadRequest("Failed to create notification");
    }
  }
}
