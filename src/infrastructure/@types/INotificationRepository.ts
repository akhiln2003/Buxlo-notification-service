import { UpdateQuery } from "mongoose";
import { NotificationEntities } from "../../domain/entities/notification";

export interface INotificationRepository {
  create(data: NotificationEntities): Promise<NotificationEntities>;
  findNotifications(
    userId: string,
    page: number,
    status: "all" | "unread",
    searchData?: string
  ): Promise<{ notifications: NotificationEntities[]; totalPages: number }>;
  delete(id: string): Promise<NotificationEntities>;
  update(
    id: string,
    updateData: UpdateQuery<NotificationEntities>
  ): Promise<NotificationEntities>;
}
