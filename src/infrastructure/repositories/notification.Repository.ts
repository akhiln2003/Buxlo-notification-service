import { UpdateQuery } from "mongoose";
import { NotificationEntities } from "../../domain/entities/notification";
import { InotificationRepository } from "../@types/InotificationRepository";
import { NotificationSchema } from "../database/mongodb/schema/notification.schema";
import { BadRequest } from "@buxlo/common";
import {
  NotificationMapper,
  NotificationResponseDto,
} from "../../zodSchemaDto/output/notificationResponse.dto";

export class NotificationRepository implements InotificationRepository {
  async create(data: NotificationEntities): Promise<NotificationResponseDto> {
    try {
      const notification = NotificationSchema.build(data);
      const newNotification = await notification.save();
      return NotificationMapper.toDto(newNotification);
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
  ): Promise<{ notifications: NotificationResponseDto[]; totalPages: number }> {
    try {
      const limit = 5;
      const skip = (page - 1) * limit;
      const query: any = { recipient: userId };

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

      const dtoNotifications = notifications.map((n) =>
        NotificationMapper.toDto(n)
      );

      return { notifications: dtoNotifications, totalPages };
    } catch (error: any) {
      throw new Error(`db error (findNotifications): ${error.message}`);
    }
  }

  async delete(id: string): Promise<NotificationResponseDto> {
    try {
      const deletedNotification =
        await NotificationSchema.findByIdAndDelete(id);
      return NotificationMapper.toDto(deletedNotification);
    } catch (error) {
      console.error(`Error deleting notification with id ${id}:`, error);

      throw new BadRequest(`db error to delete notification`);
    }
  }

  async update(
    id: string,
    updateData: UpdateQuery<NotificationEntities>
  ): Promise<NotificationResponseDto> {
    try {
      const updatedval = await NotificationSchema.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedval) {
        throw new BadRequest("Notification not found or update failed");
      }
      return NotificationMapper.toDto(updatedval);
    } catch (error: any) {
      throw new Error(`db error (updateNotification): ${error.message}`);
    }
  }
}
