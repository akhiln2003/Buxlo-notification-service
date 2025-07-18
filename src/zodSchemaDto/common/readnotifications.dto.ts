import { z } from "zod";

const notificationUpdateSchema = z.object({
  id: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
    message: "Invalid MongoDB ObjectId",
  }),
  status: z.enum(["read", "unread"]),
});

export const readnotificationsDto = z.object({
  updates: z.array(notificationUpdateSchema),
});
