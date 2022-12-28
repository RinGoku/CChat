import { Button, Container, Paper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { showCCNotification } from "components/common/helper/CCNotification";
import { CCEmailInput } from "components/input/CCEmailInput";
import { CCPasswordInput } from "components/input/CCPasswordInput";
import { errorCodeToMessage } from "error/code";
import { asErrorInfo, isErrorInfo } from "error/types";
import { useInput } from "hooks/common/useInput";
import { useCallback } from "react";

const SignUp = () => {
  const email = useInput("");
  const password = useInput("");
  const mutation = useMutation({
    mutationFn: () => {
      return fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
    },
  });
  const onClickSubmit = useCallback(async () => {
    const response = await mutation.mutateAsync();
    if (response.ok) {
      showCCNotification({
        message: "ログイン成功しました！",
        type: "success",
      });
    } else {
      const json = await response.json();
      if (isErrorInfo(json)) {
        showCCNotification({
          message: errorCodeToMessage[json.code],
          type: "error",
        });
      }
    }
  }, [mutation]);
  return (
    <Paper shadow="xs" m="md" p="md">
      <CCEmailInput {...email} />
      <CCPasswordInput {...password} />
      <Container mt="xs" p="0" ta="right">
        <Button
          onClick={onClickSubmit}
          variant="gradient"
          size="md"
          fullWidth
          gradient={{ from: "pink", to: "skyblue", deg: 105 }}
        >
          ログイン
        </Button>
      </Container>
    </Paper>
  );
};

export default SignUp;
