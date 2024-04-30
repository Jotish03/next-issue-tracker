import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string({ message: "Description fields is required!" }).min(1),
});
