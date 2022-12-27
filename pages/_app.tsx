import { MantineProvider } from "@mantine/core";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";

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
      <Component {...pageProps} />
    </MantineProvider>
  );
};
export default trpc.withTRPC(MyApp);
