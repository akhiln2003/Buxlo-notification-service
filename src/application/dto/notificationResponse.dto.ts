import { z } from "zod";
import { NotificationEntities } from "../../domain/entities/notification";

export const NotificationResponseDto = z.object({
  id: z.string(),
  recipient: z.string(),
  type: z.enum(["update", "warning", "error", "success", "message"]),
  message: z.string(),
  status: z.enum(["unread", "read"]),
});

export type NotificationResponseDto = z.infer<typeof NotificationResponseDto>;
interface INotification extends NotificationEntities{
  _id?:string
}

export class NotificationMapper {
  static toDto(notification: INotification): NotificationResponseDto {
    return NotificationResponseDto.parse({
      id: notification._id?.toString() ?? notification.id,
      recipient: notification.recipient?.toString(),
      type: notification.type,
      message: notification.message,
      status: notification.status,
    });
  }
}
