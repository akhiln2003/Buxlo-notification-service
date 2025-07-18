import { NotificationEntities } from "../../../domain/entities/notification";

export interface IreadNotificationUseCase {
  execute(
    updates: { id: string; status:"read"|"unread"}[]
  ): Promise<NotificationEntities[] | []>;
}
