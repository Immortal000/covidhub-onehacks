import firebase from "firebase/app";
import "firebase/firestore";

import firebaseRead from "./firebaseRead";

export default function firebaseWrite(zip, data) {
  firebase
    .firestore()
    .collection("Zipcodes")
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        if (doc.id === zip) {
          let currentData = doc.data();
          firebase
            .firestore()
            .collection("Zipcodes")
            .doc(zip)
            .set({
              people: [
                ...currentData.people,
                { title: data.title, message: data.message, telephone: data.telephone, tag: data.tag },
              ],
              vaccine: currentData.vaccine + data.vaccine,
            });
        } else {
          firebase
            .firestore()
            .collection("Zipcodes")
            .doc(zip)
            .set({
              people: [{ title: data.title, message: data.message, telephone: data.telephone, tag: data.tag }],
              vaccine: data.vaccine,
            });
        }
      });
    });
}
