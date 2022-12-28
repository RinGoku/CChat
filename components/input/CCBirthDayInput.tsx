import { DatePicker, DatePickerProps } from "@mantine/dates";
import { ReturnTypeUseInput } from "hooks/common/useInput";
import "dayjs/locale/ja";

export const CCBirthDayInput = (
  props: ReturnTypeUseInput<Date> & DatePickerProps
) => {
  return (
    <DatePicker
      locale="ja"
      label="誕生日"
      placeholder="誕生日を選択してください"
      labelFormat="YYYY年MM月DD日"
      inputFormat="YYYY年MM月DD日"
      {...props}
    />
  );
};
