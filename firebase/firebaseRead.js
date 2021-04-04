import firebase from "firebase/app";
import "firebase/firestore"

export default function firebaseRead(zip, setInfo){
    firebase.firestore().collection("Zipcodes").get().then((querySnapshot) => {
        querySnapshot.docs.forEach(doc => {
            if (doc.id === zip){
                setInfo({id: doc.id, data: doc.data()})
            }
        })
    })
}