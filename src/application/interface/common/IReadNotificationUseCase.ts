import { NotificationResponseDto } from "../../dto/notificationResponse.dto";

export interface IReadNotificationUseCase {
  execute(
    updates: { id: string; status: "read" | "unread" }[]
  ): Promise<NotificationResponseDto[] | []>;
}
