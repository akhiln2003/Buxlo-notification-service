import { BadRequest } from "@buxlo/common";
import { InotificationRepository } from "../../../infrastructure/@types/InotificationRepository";
import { IfetchNotificationsUseCase } from "../../interface/common/IfetchNotificationsUseCase";
import { NotificationMapper, NotificationResponseDto } from "../../../domain/zodSchemaDto/output/notificationResponse.dto";

export class FetchNotificationsUseCase implements IfetchNotificationsUseCase {
  constructor(private _notificationRepository: InotificationRepository) {}
  async execute(
    userId: string,
    page: number,
    status: "unread" | "all",
    searchData?: string
  ): Promise<{ notifications: NotificationResponseDto[]; totalPages: number }> {
    try {
      const data = await this._notificationRepository.findNotifications(
        userId,
        page,
        status,
        searchData
      );

      return {
        notifications: data.notifications.map(NotificationMapper.toDto),
        totalPages: data.totalPages,
      };
    } catch (error) {
      console.error("Error in FetchNotificationsUseCase:", error);
      throw new BadRequest("Failed to fetch notifications");
    }
  }
}
