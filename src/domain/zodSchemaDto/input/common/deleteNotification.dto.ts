import { z } from "zod";

export const deleteNotificationsDto = z.object({
  ids: z
    .array(
      z
        .string()
        .refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
          message: "Invalid MongoDB ObjectId",
        })
    )
    .nonempty("At least one ID must be provided"),
});
