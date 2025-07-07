import { z } from "zod";

export const urlRegistrationSchema = z.object({
  url: z
    .string()
    .max(255, "URLを255文字以内で入力してください")
    .url("URLを入力してください"),
});
