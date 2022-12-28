import {
  Text,
  Tooltip,
  Center,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { ReturnTypeUseInput } from "hooks/common/useInput";

export const CCEmailPairInput = (
  props: ReturnTypeUseInput<string> & TextInputProps
) => {
  const rightSection = (
    <Tooltip
      label="メールアドレスを入力することでお相手と自動的にカップル設定されます。この設定はマイページからも可能です。"
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
      label="既にカップル相手が登録している場合はメールアドレスを入力してください。"
      placeholder="メールアドレスを入力してください。"
      {...props}
    />
  );
};
