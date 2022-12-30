import { initializeApp, cert, getApps } from "firebase-admin/app";
import { parseJSONSafe } from "utils/adaptors/json";

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      // 環境変数から認証情報を取得
      parseJSONSafe(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    ),
  });
}
