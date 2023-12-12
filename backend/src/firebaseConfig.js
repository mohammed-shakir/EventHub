const { initializeApp, getApps, getApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_PROJECT_ID+".firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID+".appspot.com",
  messagingSenderId: "302116573860",
  appId: "1:302116573860:web:62a1167e5960a3271d4c31",
  measurementId: "G-JTF1XE9M5K"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const storage = getStorage(app);

module.exports = storage;