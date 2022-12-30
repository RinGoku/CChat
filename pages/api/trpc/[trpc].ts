import * as trpcNext from "@trpc/server/adapters/next";
import { showCCNotification } from "components/common/helper/CCNotification";
import { appRouter } from "server/routers/_app";
import { CreateCookieAppContext } from "server/trpc";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: CreateCookieAppContext,
  onError({ error }) {
    console.error("Error:", error);
    // showCCNotification({
    //   message: error.message,
    //   type: "error",
    // });
  },
});
