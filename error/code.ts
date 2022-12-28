export const errorCodes = [
  ["auth/registered-email", "既に登録されているメールアドレスです"],
  [
    "auth/failed-confirm-email",
    "ユーザー登録に失敗しました。しばらくしてからもう一度お試しください。",
  ],
] as const;

export const errorCodeMap = Object.fromEntries(
  errorCodes.map((code) => [code[0], code[0]])
) as { [k in typeof errorCodes[number][0]]: k };

export const errorCodeToMessage = Object.fromEntries(
  errorCodes.map((code) => [code[0], code[1]])
) as { [k in typeof errorCodes[number][0]]: typeof errorCodes[number][1] };
