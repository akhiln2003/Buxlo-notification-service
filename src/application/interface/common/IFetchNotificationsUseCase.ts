import { NotificationResponseDto } from "../../dto/notificationResponse.dto";

export interface IFetchNotificationsUseCase {
  execute(
    userId: string,
    page: number,
    status: "unread" | "all",
    searchData?: string 
  ): Promise<{notifications:NotificationResponseDto[],totalPages: number }>;
}
