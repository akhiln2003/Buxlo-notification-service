import { NotificationResponseDto } from "../../../domain/zodSchemaDto/output/notificationResponse.dto";

export interface IReadNotificationUseCase {
  execute(
    updates: { id: string; status: "read" | "unread" }[]
  ): Promise<NotificationResponseDto[] | []>;
}
