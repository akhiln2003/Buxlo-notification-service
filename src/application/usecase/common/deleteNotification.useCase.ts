import { BadRequest } from "@buxlo/common";
import { IdeleteNotificationUseCase } from "../../interface/common/IdeleteNotificationUseCase";
import { InotificationRepository } from "../../../infrastructure/@types/InotificationRepository";

export class DeleteNotificationUseCase implements IdeleteNotificationUseCase {
  constructor(private notificationRepo: InotificationRepository) {}
  async execute(ids: string[]): Promise<string> {
    try {
        await Promise.all(
        ids.map((id) => this.notificationRepo.delete(id))
      );
      return "Deleted Notifications";
    } catch (error) {
        console.error("Error from DeleteNotificationUseCase : " , error );
        
      throw new BadRequest("Faild to delete notification try again laiter");
    }
  }
}
