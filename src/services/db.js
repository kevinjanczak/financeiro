import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyCB2l00d9QPiUm5CZkBoCGmmZ2DRNZnZXk",
        authDomain: "financeiro-e5094.firebaseapp.com",
        projectId: "financeiro-e5094",
        storageBucket: "financeiro-e5094.appspot.com",
        messagingSenderId: "820644317031",
        appId: "1:820644317031:web:147cf082210a5b05bbd1c2"
    })
    .firestore()


export const payableCollection = db.collection('payable')
export const receivableCollection = db.collection('receivable')

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })