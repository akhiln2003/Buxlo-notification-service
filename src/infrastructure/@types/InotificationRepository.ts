import { UpdateQuery } from "mongoose";
import { NotificationEntities } from "../../domain/entities/notification";
import { NotificationResponseDto } from "../../zodSchemaDto/output/notificationResponse.dto";

export interface InotificationRepository {
  create(data: NotificationEntities): Promise<NotificationResponseDto>;
  findNotifications(
    userId: string,
    page: number,
    status: "all" | "unread",
    searchData?: string
  ): Promise<{ notifications: NotificationResponseDto[]; totalPages: number }>;
  delete(id: string): Promise<NotificationResponseDto>;
  update(
    id: string,
    updateData: UpdateQuery<NotificationEntities>
  ): Promise<NotificationResponseDto>;
}
