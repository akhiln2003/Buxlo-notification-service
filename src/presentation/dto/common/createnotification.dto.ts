import { z } from "zod";

const notificationDataSchema = z.object({
  recipient: z
    .string()
    .length(24, { message: "Recipient must be a 24-character ObjectId" })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid MongoDB ObjectId" }),

  type: z.enum(["update", "warning", "error", "success", "message"], {
    required_error: "Type is required",
  }),

  message: z.string().min(1, { message: "Message cannot be empty" }),

  status: z.enum(["unread", "read"], {
    required_error: "Status is required",
  }),
});

export const createNotificationDto = z.object({
  data: notificationDataSchema,
});
