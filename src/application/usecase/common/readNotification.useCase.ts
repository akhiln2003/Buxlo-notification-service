import { BadRequest } from "@buxlo/common";
import { NotificationRepository } from "../../../infrastructure/repositories/notification.Repository";
import { IReadNotificationUseCase } from "../../interface/common/IReadNotificationUseCase";
import {
  NotificationMapper,
  NotificationResponseDto,
} from "../../dto/notificationResponse.dto";

export class ReadNotificationUseCase implements IReadNotificationUseCase {
  constructor(private _notificationRepo: NotificationRepository) {}

  async execute(
    updates: { id: string; status: "read" | "unread" }[]
  ): Promise<NotificationResponseDto[] | []> {
    try {
      const results = await Promise.all(
        updates.map(({ id, status }) =>
          this._notificationRepo.update(id, { status })
        )
      );

      return results.map(NotificationMapper.toDto);
    } catch (error) {
      console.error("Error reading notifications:", error);
      throw new BadRequest("Failed to process notification updates.");
    }
  }
}
