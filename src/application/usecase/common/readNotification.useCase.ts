import { BadRequest } from "@buxlo/common";
import { NotificationRepository } from "../../../infrastructure/repositories/notification.Repository";
import { IreadNotificationUseCase } from "../../interface/common/IreadNotificationUseCase";
import { NotificationResponseDto } from "../../../zodSchemaDto/output/notificationResponse.dto";

export class ReadNotificationUseCase implements IreadNotificationUseCase {
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

      return results;
    } catch (error) {
      console.error("Error reading notifications:", error);
      throw new BadRequest("Failed to process notification updates.");
    }
  }
}
