import { BadRequest } from "@buxlo/common";
import { INotificationRepository } from "../../../infrastructure/@types/INotificationRepository";
import { IFetchNotificationsUseCase } from "../../interface/common/IFetchNotificationsUseCase";
import { NotificationMapper, NotificationResponseDto } from "../../dto/notificationResponse.dto";

export class FetchNotificationsUseCase implements IFetchNotificationsUseCase {
  constructor(private _notificationRepository: INotificationRepository) {}
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
