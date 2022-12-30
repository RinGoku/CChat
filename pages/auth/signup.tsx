import { Button, Container, Paper } from "@mantine/core";
import { showCCNotification } from "components/common/helper/CCNotification";
import { CCEmailInput } from "components/input/CCEmailInput";
import { CCPasswordInput } from "components/input/CCPasswordInput";
import { useInput } from "hooks/common/useInput";
import { useCallback } from "react";
import { trpc } from "utils/trpc";

const SignUp = () => {
  const email = useInput("");
  const password = useInput("");
  const mutation = trpc.signUp.useMutation();
  const onClickSubmit = useCallback(async () => {
    const response = await mutation
      .mutateAsync({
        email: email.value,
        password: password.value,
      })
      .catch((e) => {
        showCCNotification({
          message: e.message,
          type: "error",
        });
        return null;
      });
    if (response !== null) {
      showCCNotification({
        title: `仮登録完了がしました！`,
        message:
          "入力されたメールアドレスに本登録用のメールを送信しました。ご確認の上、本登録をお願いします。",
        type: "success",
      });
    }
  }, [mutation]);
  return (
    <Paper withBorder shadow="md" p={30} m={30} radius="md">
      <CCEmailInput {...email} />
      <CCPasswordInput {...password} />
      <Container mt="xs" p="0" ta="right">
        <Button
          onClick={onClickSubmit}
          variant="gradient"
          size="md"
          fullWidth
          gradient={{ from: "#f6e0fc", to: "#90adff", deg: 105 }}
        >
          登録
        </Button>
      </Container>
    </Paper>
  );
};

export default SignUp;
