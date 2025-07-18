import { NotificationEntities } from "../../../domain/entities/notification";

export interface IfetchNotificationsUseCase {
  execute(
    userId: string,
    page: number,
    status: "unread" | "all",
    searchData?: string 
  ): Promise<{notifications:NotificationEntities[],totalPages: number }>;
}
