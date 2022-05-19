// Import the Firebase SDK for Google Cloud Functions.
// const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
import * as admin from 'firebase-admin';

let adminConfig: any = {};
if (process.env.FIREBASE_CONFIG) {
  adminConfig = JSON.parse(process.env.FIREBASE_CONFIG!);
} else {
  const serviceAccount = require('./serviceAccount.json');
  adminConfig = require('./environment.json');
  adminConfig.credential = admin.credential.cert(serviceAccount);
}
admin.initializeApp(adminConfig);

export function getFirebaseConfig() {
  return adminConfig;
}

export * from './app';
