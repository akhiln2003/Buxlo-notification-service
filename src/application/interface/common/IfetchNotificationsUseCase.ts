import { NotificationResponseDto } from "../../../zodSchemaDto/output/notificationResponse.dto";

export interface IfetchNotificationsUseCase {
  execute(
    userId: string,
    page: number,
    status: "unread" | "all",
    searchData?: string 
  ): Promise<{notifications:NotificationResponseDto[],totalPages: number }>;
}
