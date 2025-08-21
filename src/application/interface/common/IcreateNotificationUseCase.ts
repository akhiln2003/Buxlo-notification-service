import { NotificationEntities } from "../../../domain/entities/notification";
import { NotificationResponseDto } from "../../../zodSchemaDto/output/notificationResponse.dto";

export interface IcreateNotificationUseCase {
  execute(data: NotificationEntities): Promise<NotificationResponseDto>;
}
