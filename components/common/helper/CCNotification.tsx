import { showNotification, NotificationProps } from "@mantine/notifications";
import {
  IconCheck,
  IconX,
  IconAlertCircle,
  IconInfoCircle,
} from "@tabler/icons";
import { match } from "ts-pattern";

type CCNotificatioType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

type CCNotificationProps = {
  message: string;
  type?: CCNotificatioType;
  title?: string;
};

export const getCCNotificationSetting = ({
  message,
  title,
  type = "default",
}: CCNotificationProps): NotificationProps => {
  return match(type)
    .with("default", () => ({
      title,
      message,
    }))
    .with("success", () => ({
      title,
      message,
      icon: <IconCheck size={18} />,
      color: "teal",
    }))
    .with("error", () => ({
      title,
      message,
      icon: <IconX size={18} />,
      color: "red",
    }))
    .with("warning", () => ({
      title,
      message,
      icon: <IconAlertCircle size={18} />,
      color: "yellow",
    }))
    .with("info", () => ({
      title,
      message,
      icon: <IconInfoCircle size={18} />,
      color: "green",
    }))
    .with("loading", () => ({
      title,
      message,
      loading: true,
      disallowClose: true,
    }))
    .exhaustive();
};

export const showCCNotification = (props: CCNotificationProps) => {
  return showNotification(getCCNotificationSetting(props));
};
