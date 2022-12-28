import { Radio, RadioGroupProps } from "@mantine/core";
import { ReturnTypeUseInput } from "hooks/common/useInput";

export const Gender = [
  ["M", "男性"],
  ["F", "女性"],
  ["O", "無回答"],
];

export const CCGenderInput = (
  props: ReturnTypeUseInput<string> & Omit<RadioGroupProps, "children">
) => {
  return (
    <Radio.Group name="gender" label="性別" withAsterisk {...props}>
      {Gender.map(([value, label]) => (
        <Radio value={value} label={label} />
      ))}
    </Radio.Group>
  );
};
