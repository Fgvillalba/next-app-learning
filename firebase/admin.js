const admin = require("firebase-admin")

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_KEY_TYPE,
      project_id: process.env.FIREBASE_KEY_PROJECT_ID,
      private_key_id: process.env.FIREBASE_KEY_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_KEY_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_KEY_CLIENT_ID,
      auth_uri: process.env.FIREBASE_KEY_AUTH_URI,
      token_uri: process.env.FIREBASE_KEY_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_KEY_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_KEY_CLIENT_X509_CERT_URL,
    }),
    databaseURL: process.env.FIREBASE_DATASE_URL,
  })
} catch (e) {}

export const fireStore = admin.firestore()
