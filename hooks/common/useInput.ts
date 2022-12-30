import { useInputState } from "@mantine/hooks";

export const useInput = <T>(initialState: T) => {
  const [value, onChange] = useInputState(initialState);
  return { value, onChange } as const;
};

// ジェネリクス指定をすると、ReturnTypeがうまく動かないので、classでラップすると上手くいくトリック
class UseInputWrapper<T> {
  useInput = (initialState: T) => useInput(initialState);
}

export type ReturnTypeUseInput<T> = ReturnType<UseInputWrapper<T>["useInput"]>;
