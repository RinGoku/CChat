import * as firebaseAdmin from "firebase-admin";
import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";
import "../../../server/firebase";
const TOPIC_NAME = "test";

// firebaseAdmin.initializeApp();

const sendMessage = async (): Promise<BatchResponse> => {
  const params = {
    notification: {
      title: "テストタイトル",
      body: "テスト本文",
    },
    tokens: [
      "f0C8GqKPHNDdIzAeIAqQXQ:APA91bF8-sMO3HSSWjFGSSQu6rWZEb3Mm3mB1dMkAThR8gaWlZK_hL5XnyPJcVU8DHbfIefBGmnIGTbu9oN1Ne21ZMqbWwh9TlQcKWGEGv5PcxHnxh2vRrSv3he_YFiWmkUJ--MSMGwa",
      "dSeqbNEImZ6FMpsD11nor2:APA91bGxy-y9W2fEzoiXeJThsvGae0iEbyQgIJPx8ylSUhu5YuEVCpYeAwo5M0V2uwLWO6cCsHH-JY1Q_EFzNZgnu-DtEOjWrGkH620Ah4jt1tnW-myQFR3eQvP9MnVAoi1x6_firwhF",
    ],
  };

  return await firebaseAdmin.messaging().sendMulticast(params);
};

export default async function handler(req, res) {
  const message = await sendMessage();
  res.status(200).json({ name: message.responses });
}
