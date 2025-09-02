import { NotificationEntities } from "../../../domain/entities/notification";
import { NotificationResponseDto } from "../../../domain/zodSchemaDto/output/notificationResponse.dto";

export interface ICreateNotificationUseCase {
  execute(data: NotificationEntities): Promise<NotificationResponseDto>;
}
