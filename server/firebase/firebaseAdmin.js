// firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
