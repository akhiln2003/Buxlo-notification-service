import { BadRequest } from "@buxlo/common";
import { NotificationEntities } from "../../../domain/entities/notification";
import { NotificationRepository } from "../../../infrastructure/repositories/notification.Repository";
import { IreadNotificationUseCase } from "../../interface/common/IreadNotificationUseCase";

export class ReadNotificationUseCase implements IreadNotificationUseCase {
  constructor(private notificationRepo: NotificationRepository) {}

  async execute(
    updates: { id: string; status: "read" | "unread" }[]
  ): Promise<NotificationEntities[] | []> {
    try {
      const results = await Promise.all(
        updates.map(({ id, status }) =>
          this.notificationRepo.update(id, { status })
        )
      );

      return results;
    } catch (error) {
      console.error("Error reading notifications:", error);
      throw new BadRequest("Failed to process notification updates.");
    }
  }
}
