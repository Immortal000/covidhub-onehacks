import firebaseInit from "../../firebase/firebaseInit";
import firebase from "firebase";

firebaseInit()

export default async (req, res) => {
    let id, data
    const collections = await firebase.firestore().collection("Zipcodes").get()
    for (const doc of collections.docs) {
        if (doc.id === req.query.zipcode){
            id = doc.id
            data = doc.data()
        }
    }
    res.status(200).json({ id, data })
}
