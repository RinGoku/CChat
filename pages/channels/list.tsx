import { useCallback, useState } from "react";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  Button,
} from "@mantine/core";
import { trpc } from "utils/trpc";
import Chat from "components/chat/Chat";
import { IconMenu2 } from "@tabler/icons";
import { CCChannelNameInput } from "components/input/CCChannelNameInput";
import { showCCNotification } from "components/common/helper/CCNotification";
import { useInput } from "hooks/common/useInput";

const DoubleNavbar = () => {
  const { classes, cx } = useStyles();
  const [activeLink, setActiveLink] = useState<number>();
  const [visibleNavBar, setVisibleNavBar] = useState(true);
  const { data: channels } = trpc.channels.useQuery();

  const links = channels?.channels?.map((channel) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === channel.id,
      })}
      href="/"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(channel.id);
      }}
      key={channel.id}
    >
      {channel.name}
    </a>
  ));

  const channel = useInput("");
  const utils = trpc.useContext();
  const createChannel = trpc.createChannels.useMutation({
    onSuccess: () => {
      utils.channels.invalidate();
    },
  });
  const onClickCreate = useCallback(async () => {
    const response = await createChannel.mutateAsync({
      name: channel.value,
    });
    if (response.channels) {
      showCCNotification({
        message: "チャンネルを作成しました",
        type: "success",
      });
    }
  }, [channel]);

  return (
    <div className={classes.wrapper}>
      {visibleNavBar ? (
        <Navbar className="h-screen w-80 max-sm:w-screen maxsm:z-10 max-sm:absolute">
          <Navbar.Section grow className={classes.wrapper}>
            <div className="flex flex-col flex-nowrap w-full">
              <Title
                order={4}
                className="p-4 flex items-center justify-between"
              >
                チャンネル一覧
                <Button onClick={() => setVisibleNavBar((v) => !v)}>
                  <IconMenu2 />
                </Button>
              </Title>
              {links}
              <div className="mt-auto px-2 mb-2">
                <CCChannelNameInput {...channel} />
                <Button onClick={onClickCreate} className="mt-4 w-full">
                  チャンネル作成
                </Button>
              </div>
            </div>
          </Navbar.Section>
        </Navbar>
      ) : (
        <Button
          className="fixed top-2 left-2 z-10"
          onClick={() => setVisibleNavBar((v) => !v)}
        >
          <IconMenu2 />
        </Button>
      )}
      <Chat channelId={activeLink} className="grow" />
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  asideRight: {
    flexGrow: 1,
  },

  aside: {
    flex: "0 0 60px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
    fontWeight: 500,
    height: 44,
    lineHeight: "44px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

export default DoubleNavbar;
