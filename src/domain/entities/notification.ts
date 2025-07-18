import mongoose from "mongoose";

export class NotificationEntities {
  constructor(
    public recipient: mongoose.Types.ObjectId,
    public type: "update" | "warning" | "error" | "success"| "message",
    public message: string,
    public status: "unread" | "read",
    public id?: string
  ) {}
}
