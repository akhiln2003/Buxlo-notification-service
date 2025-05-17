import { NotificationEntities } from "../../domain/entities/notification";

export interface InotificationRepository {
  create(data: NotificationEntities): Promise<NotificationEntities>;

}
