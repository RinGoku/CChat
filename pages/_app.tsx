import { MantineProvider } from "@mantine/core";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { NotificationsProvider } from "@mantine/notifications";
import "../styles/global.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
};
export default trpc.withTRPC(MyApp);
