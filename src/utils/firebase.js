import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "huberman-54e1e.firebaseapp.com",
  projectId: "huberman-54e1e",
  storageBucket: "huberman-54e1e.appspot.com",
  messagingSenderId: "862539159858",
  appId: "1:862539159858:web:15d95b714915fc753a9f2b"
};

const app = initializeApp(firebaseConfig);

export { app };
