import { MutationFunction, useMutation } from "@tanstack/react-query";
import { showCCNotification } from "components/common/helper/CCNotification";
import { errorCodeToMessage } from "error/code";
import { isErrorInfo } from "error/types";

export const useCCMutation = (func: MutationFunction<Response, void>) => {
  return useMutation({
    mutationFn: func,
    onSettled: async (data) => {
      if (!data.ok) {
        const error = await data.json();
        if (isErrorInfo(error)) {
          showCCNotification({
            message: errorCodeToMessage[error.code],
            type: "error",
          });
        }
      }
    },
  });
};
