import { Button, Container, Paper } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { showCCNotification } from "components/common/helper/CCNotification";
import { CCEmailInput } from "components/input/CCEmailInput";
import { CCPasswordInput } from "components/input/CCPasswordInput";
import { useInput } from "hooks/common/useInput";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { checkCreatedUser } from "server/auth/checkCreatedUser";
import { defaultGetServerSideProps } from "server/auth/setting";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return (
    (await checkCreatedUser(req, "/channels")) ?? defaultGetServerSideProps
  );
};

const SignIn = () => {
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
  const router = useRouter();
  const onClickSubmit = useCallback(async () => {
    const response = await mutation.mutateAsync();
    if (response.ok) {
      showCCNotification({
        message: "ログイン成功しました！",
        type: "success",
      });
      router.push("/");
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
          gradient={{ from: "#cae5fa", to: "#90adff", deg: 105 }}
        >
          ログイン
        </Button>
      </Container>
    </Paper>
  );
};

export default SignIn;
