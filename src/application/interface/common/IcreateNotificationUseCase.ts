import { NotificationEntities } from "../../../domain/entities/notification";

export interface IcreateNotificationUseCase {
  execute(data: NotificationEntities): Promise<NotificationEntities>;
}
