import {
  Text,
  Tooltip,
  Center,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { ReturnTypeUseInput } from "hooks/common/useInput";

export const CCNameInput = (
  props: ReturnTypeUseInput<string> & TextInputProps
) => {
  const rightSection = (
    <Tooltip
      label="アプリ上で表示する名前を入力してください。"
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
      label="ユーザー名"
      placeholder="ユーザー名を入力してください。"
      {...props}
    />
  );
};
