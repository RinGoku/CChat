import { initializeApp, cert, getApps } from "firebase-admin/app";

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      // 環境変数から認証情報を取得
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    ),
  });
}
