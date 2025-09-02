import { BadRequest } from "@buxlo/common";
import { IDeleteNotificationUseCase } from "../../interface/common/IDeleteNotificationUseCase";
import { INotificationRepository } from "../../../infrastructure/@types/INotificationRepository";

export class DeleteNotificationUseCase implements IDeleteNotificationUseCase {
  constructor(private _notificationRepo: INotificationRepository) {}
  async execute(ids: string[]): Promise<string> {
    try {
        await Promise.all(
        ids.map((id) => this._notificationRepo.delete(id))
      );
      return "Deleted Notifications";
    } catch (error) {
        console.error("Error from DeleteNotificationUseCase : " , error );
        
      throw new BadRequest("Faild to delete notification try again laiter");
    }
  }
}
