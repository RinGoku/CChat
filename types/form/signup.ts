import { passwordSetting } from "utils/appSetting";
import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(passwordSetting.min).regex(passwordSetting.regex),
});

export type SignUpSchema = z.infer<typeof schema>;
