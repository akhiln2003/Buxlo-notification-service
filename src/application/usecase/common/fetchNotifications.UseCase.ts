import { BadRequest } from "@buxlo/common";
import { NotificationEntities } from "../../../domain/entities/notification";
import { InotificationRepository } from "../../../infrastructure/@types/InotificationRepository";
import { IfetchNotificationsUseCase } from "../../interface/common/IfetchNotificationsUseCase";

export class FetchNotificationsUseCase implements IfetchNotificationsUseCase {
  constructor(private notificationRepository: InotificationRepository) {}
  async execute(
    userId: string,
    page: number,
    status: "unread" | "all",
    searchData?: string
  ): Promise<{notifications:NotificationEntities[],totalPages: number }> {
    try {
      return await this.notificationRepository.findNotifications(
        userId,
        page,
        status,
        searchData
      );
    } catch (error) {
      console.error("Error in FetchNotificationsUseCase:", error);
      throw new BadRequest("Failed to fetch notifications");
    }
  }
}
