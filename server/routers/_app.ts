import { router } from "../trpc";
import { channelFragment } from "server/routers/fragment/channels";
import { chatFragment } from "server/routers/fragment/chats";
import { userFragment } from "server/routers/fragment/user";
import { authFragment } from "server/routers/fragment/auth";

export const appRouter = router({
  ...userFragment,
  ...channelFragment,
  ...chatFragment,
  ...authFragment,
});

export type AppRouter = typeof appRouter;
