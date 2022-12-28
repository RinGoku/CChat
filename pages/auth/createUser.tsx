import { Button, Container, Paper } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { showCCNotification } from "components/common/helper/CCNotification";
import { CCBirthDayInput } from "components/input/CCBirthDayInput";
import { CCEmailPairInput } from "components/input/CCEmailPairInput";
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
  const pairEmail = useInput("");
  const mutation = useMutation({
    mutationFn: () => {
      return fetch("/api/auth/createUser", {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          birthDay: birthDay.value,
          gender: gender.value,
          pairEmail: pairEmail.value,
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
      <CCNameInput {...name} />
      <CCGenderInput {...gender} mt="md" />
      <CCBirthDayInput {...birthDay} mt="md" />
      <CCEmailPairInput {...pairEmail} mt="md" />
      <Container mt="xl" p="0" ta="right">
        <Button
          onClick={onClickSubmit}
          variant="gradient"
          size="md"
          fullWidth
          gradient={{ from: "pink", to: "skyblue", deg: 60 }}
        >
          会員情報を登録する
        </Button>
      </Container>
    </Paper>
  );
};

export default CreateUser;
