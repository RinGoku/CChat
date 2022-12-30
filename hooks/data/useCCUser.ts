import { trpc } from "utils/trpc";

export const useCCUser = () => {
  const { data: user } = trpc.user.useQuery();
};
