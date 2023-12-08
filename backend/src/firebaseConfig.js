const { initializeApp, getApps, getApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "eventhub-405913.firebaseapp.com",
  projectId: "eventhub-405913",
  storageBucket: "eventhub-405913.appspot.com",
  messagingSenderId: "302116573860",
  appId: "1:302116573860:web:62a1167e5960a3271d4c31",
  measurementId: "G-JTF1XE9M5K"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const storage = getStorage(app);

module.exports = storage;