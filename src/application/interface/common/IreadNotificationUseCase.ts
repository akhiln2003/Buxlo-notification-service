import { NotificationResponseDto } from "../../../zodSchemaDto/output/notificationResponse.dto";

export interface IreadNotificationUseCase {
  execute(
    updates: { id: string; status: "read" | "unread" }[]
  ): Promise<NotificationResponseDto[] | []>;
}
