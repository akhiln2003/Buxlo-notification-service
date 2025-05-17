import { NotificationEntities } from "../../domain/entities/notification";
import { InotificationRepository } from "../@types/InotificationRepository";
import { Notification } from "../database/mongodb/schema/notification.schema";


export class NotificationRepository implements InotificationRepository {
  async create(data: NotificationEntities): Promise<NotificationEntities> {
    try {
      const newUser = Notification.build(data);
      return await newUser.save();
    } catch (error: any) {
      //   customLogger.error(`db error: ${error.message }`);
      throw new Error(`db error: ${error.message}`);
    }
  }
  
}
