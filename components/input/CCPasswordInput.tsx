import {
  PasswordInput,
  Text,
  Group,
  PasswordInputProps,
  Anchor,
  Tooltip,
} from "@mantine/core";
import { ReturnTypeUseInput } from "hooks/common/useInput";
import { useState } from "react";
import { passwordSetting } from "utils/appSetting";

export const CCPasswordInput = ({
  className,
  style,
  value,
  onChange,
  ...others
}: PasswordInputProps & ReturnTypeUseInput<string>) => {
  const [opened, setOpened] = useState(false);
  const valid =
    value?.trim?.().length >= passwordSetting.min &&
    value?.match?.(passwordSetting.regex);
  return (
    <Tooltip
      label={
        valid
          ? "OK!"
          : "パスワードは８文字以上の英大文字英小文字数字混在で入力してください。"
      }
      position="top-start"
      withArrow
      opened={opened}
      color={valid ? "teal" : undefined}
    >
      <PasswordInput
        label="パスワード"
        required
        placeholder="パスワードを入力してください。"
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={onChange}
      />
    </Tooltip>
  );
};
