import mongoose from "mongoose";
import { NotificationResponseDto } from "../../dto/notificationResponse.dto";

export interface ICreateNotificationUseCaseProps {
  recipient: mongoose.Types.ObjectId;
  type: "update" | "warning" | "error" | "success" | "message";
  message: string;
  status: "unread" | "read";
}

export interface ICreateNotificationUseCase {
  execute(
    data: ICreateNotificationUseCaseProps
  ): Promise<NotificationResponseDto>;
}
