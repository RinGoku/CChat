import { Button, Container, Paper } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { showCCNotification } from "components/common/helper/CCNotification";
import { CCBirthDayInput } from "components/input/CCBirthDayInput";
import { CCGenderInput, Gender } from "components/input/CCGenderInput";
import { CCNameInput } from "components/input/CCNameInput";
import { useInput } from "hooks/common/useInput";
import { GetServerSideProps } from "next";
import { useCallback } from "react";

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   return undefined;
// };

const CreateUser = () => {
  const name = useInput("");
  const gender = useInput(Gender[0][0]);
  const birthDay = useInput<Date>(new Date());
  const mutation = useMutation({
    mutationFn: () => {
      return fetch("/api/auth/createUser", {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          birthDay: birthDay.value,
          gender: gender.value,
        }),
      });
    },
  });
  const onClickSubmit = useCallback(async () => {
    const response = await mutation.mutateAsync();
    if (response.ok) {
      showCCNotification({
        message: `会員登録が完了しました！`,
        type: "success",
      });
    }
  }, [mutation]);
  return (
    <Paper withBorder shadow="md" p={30} m={30} radius="md">
      <CCNameInput {...name} mt="xs" />
      <CCGenderInput {...gender} mt="xs" />
      <CCBirthDayInput {...birthDay} mt="xs" />
      <Container mt="xs" p="0" ta="right">
        <Button
          onClick={onClickSubmit}
          variant="gradient"
          size="md"
          fullWidth
          gradient={{ from: "pink", to: "skyblue", deg: 105 }}
        >
          会員情報を登録する
        </Button>
      </Container>
    </Paper>
  );
};

export default CreateUser;
