import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default function firebaseInit() {
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase Connected!");
  } else {
    firebase.app();
  }
}
