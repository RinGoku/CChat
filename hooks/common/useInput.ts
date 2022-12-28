import { useInputState } from "@mantine/hooks";

export const useInput = <T>(initialState: T) => {
  const [value, onChange] = useInputState(initialState);
  return { value, onChange } as const;
};

class UseInputWrapper<T> {
  useInput = (initialState: T) => useInput(initialState);
}

export type ReturnTypeUseInput<T> = ReturnType<UseInputWrapper<T>["useInput"]>;
