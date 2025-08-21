import { z } from "zod";

export const NotificationResponseDto = z.object({
  id: z.string(),
  recipient: z.string(),
  type: z.enum(["update", "warning", "error", "success", "message"]),
  message: z.string(),
  status: z.enum(["unread", "read"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type NotificationResponseDto = z.infer<typeof NotificationResponseDto>;

export class NotificationMapper {
  static toDto(notification: any): NotificationResponseDto {
    return NotificationResponseDto.parse({
      id: notification._id?.toString() ?? notification.id,
      recipient: notification.recipient?.toString(),
      type: notification.type,
      message: notification.message,
      status: notification.status,
      createdAt: new Date(notification.createdAt),
      updatedAt: new Date(notification.updatedAt),
    });
  }
}
