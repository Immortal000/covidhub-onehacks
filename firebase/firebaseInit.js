import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

export default function firebaseInit(){
    const firebaseConfig = {
        apiKey: "AIzaSyC9aj7Xlno0hDnLu59OgLiMDjD7z97Yiug",
        authDomain: "fire0base145.firebaseapp.com",
        databaseURL: "https://fire0base145.firebaseio.com",
        projectId: "fire0base145",
        storageBucket: "fire0base145.appspot.com",
        messagingSenderId: "769441970390",
        appId: "1:769441970390:web:f6d1f20667dcd030a27177"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("Firebase Connected!")
    }else {
        firebase.app();
    }
}