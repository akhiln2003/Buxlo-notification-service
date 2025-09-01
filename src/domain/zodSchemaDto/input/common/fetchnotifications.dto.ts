import { z } from "zod";

export const fetchNotificationsDto = z.object({
  userId: z.string().refine((id) => /^[0-9a-f]{24}$/.test(id), {
    message:
      "Invalid user ID format. Expected a valid 24-character MongoDB ObjectId.",
  }),

  page: z
    .string()
    .transform(Number)
    .refine((n) => Number.isInteger(n) && n > 0, {
      message: "Page must be a positive whole number.",
    })
    .optional(),

  status: z.enum(["all", "unread"], {
    errorMap: () => ({ message: "Status must be either 'all' or 'unread'." }),
  }),

  searchData: z
    .string()
    .max(100, {
      message: "Search input must be under 100 characters.",
    })
    .optional(),
});
