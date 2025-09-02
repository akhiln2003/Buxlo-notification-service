import { NotificationResponseDto } from "../../../domain/zodSchemaDto/output/notificationResponse.dto";

export interface IFetchNotificationsUseCase {
  execute(
    userId: string,
    page: number,
    status: "unread" | "all",
    searchData?: string 
  ): Promise<{notifications:NotificationResponseDto[],totalPages: number }>;
}
