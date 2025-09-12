import { FilterQuery, UpdateQuery } from "mongoose";
import { NotificationEntities } from "../../domain/entities/notification";
import { INotificationRepository } from "../@types/INotificationRepository";
import { NotificationSchema } from "../database/mongodb/schema/notification.schema";
import { BadRequest } from "@buxlo/common";

export class NotificationRepository implements INotificationRepository {
  async create(data: NotificationEntities): Promise<NotificationEntities> {
    try {
      const notification = NotificationSchema.build(data);
      const newNotification = await notification.save();
      return newNotification;
    } catch (error: any) {
      //   customLogger.error(`db error: ${error.message }`);
      throw new Error(`db error: ${error.message}`);
    }
  }

  async findNotifications(
    userId: string,
    page: number,
    status: "all" | "unread",
    searchData?: string
  ): Promise<{ notifications: NotificationEntities[]; totalPages: number }> {
    try {
      const limit = 5;
      const skip = (page - 1) * limit;
      const query: FilterQuery<NotificationEntities> = { recipient: userId };

      if (status === "unread") {
        query.status = "unread";
      }

      const searchableTypes = [
        "update",
        "warning",
        "error",
        "success",
        "message",
      ];

      if (searchData) {
        const lowerSearch = searchData.toLowerCase();

        if (searchableTypes.some((type) => lowerSearch.startsWith(type))) {
          query.type = new RegExp(`^${lowerSearch}`, "i");
        } else {
          query.message = new RegExp(lowerSearch, "i");
        }
      }

      const totalCount = await NotificationSchema.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);

      const notifications = await NotificationSchema.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return { notifications, totalPages };
    } catch (error: any) {
      throw new Error(`db error (findNotifications): ${error.message}`);
    }
  }

  async delete(id: string): Promise<NotificationEntities> {
    try {
      const deletedNotification =
        await NotificationSchema.findByIdAndDelete(id);

      if (!deletedNotification)
        throw new BadRequest("Faild to delete notification");
      return deletedNotification;
    } catch (error) {
      console.error(`Error deleting notification with id ${id}:`, error);

      throw new BadRequest(`db error to delete notification`);
    }
  }

  async update(
    id: string,
    updateData: UpdateQuery<NotificationEntities>
  ): Promise<NotificationEntities> {
    try {
      const updatedval = await NotificationSchema.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedval) {
        throw new BadRequest("Notification not found or update failed");
      }
      return updatedval;
    } catch (error: any) {
      throw new Error(`db error (updateNotification): ${error.message}`);
    }
  }
}
