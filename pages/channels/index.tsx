import { Button } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { showCCNotification } from "components/common/helper/CCNotification";
import { CCChannelNameInput } from "components/input/CCChannelNameInput";
import { useInput } from "hooks/common/useInput";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { defaultGetServerSideProps } from "server/auth/setting";
import { verifyTokenOnServerRender } from "server/auth/verifyTokens";
import { trpc } from "utils/trpc";

const Channel = () => {
  const { data: channels } = trpc.channels.useQuery();
  const channel = useInput("");
  const utils = trpc.useContext();
  const createChannel = trpc.createChannels.useMutation({
    onSuccess: () => {
      utils.channels.invalidate();
    },
  });
  const onClickCreate = useCallback(async () => {
    const response = await createChannel.mutateAsync({
      name: channel.value,
    });
    if (response.channels) {
      showCCNotification({
        message: "チャンネルを作成しました",
        type: "success",
      });
    }
  }, [channel]);
  return (
    <div>
      {channels?.channels.map((c) => c.name)}
      <CCChannelNameInput {...channel} />
      <Button onClick={onClickCreate}>チャンネル作成</Button>
    </div>
  );
};

export default Channel;
