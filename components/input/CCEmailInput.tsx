import {
  PasswordInput,
  Text,
  Group,
  PasswordInputProps,
  Anchor,
  Tooltip,
  Center,
  TextInput,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { ReturnTypeUseInput } from "hooks/common/useInput";

export const CCEmailInput = (props: ReturnTypeUseInput<string>) => {
  const rightSection = (
    <Tooltip
      label="メールアドレスを入力してください。"
      position="top-end"
      withArrow
      transition="pop-bottom-right"
    >
      <Text color="dimmed" sx={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      rightSection={rightSection}
      label="登録メールアドレス"
      placeholder="メールアドレスを入力してください。"
      {...props}
    />
  );
};
