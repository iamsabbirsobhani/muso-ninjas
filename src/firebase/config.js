import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAeofjbtaLB25iy4_gmPgj3f5_1xuXiALI",
    authDomain: "muso-ninjas-def94.firebaseapp.com",
    projectId: "muso-ninjas-def94",
    storageBucket: "muso-ninjas-def94.appspot.com",
    messagingSenderId: "915811340580",
    appId: "1:915811340580:web:4e67173177ef987ab7a3b1"
  };
// initialize firestore
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }