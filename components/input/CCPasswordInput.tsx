import {
  PasswordInput,
  Text,
  Group,
  PasswordInputProps,
  Anchor,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { passwordSetting } from "utils/appSetting";

export const CCPasswordInput = ({
  className,
  style,
  ...others
}: PasswordInputProps) => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const valid =
    value.trim().length >= passwordSetting.min &&
    value.match(passwordSetting.regex);
  return (
    <Tooltip
      label={
        valid
          ? "OK!"
          : "パスワードは８文字以上の英大文字英小文字数字混在で入力してください。"
      }
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? "teal" : undefined}
    >
      <PasswordInput
        label="Tooltip shown onFocus"
        required
        placeholder="Your password"
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Tooltip>
  );
};
