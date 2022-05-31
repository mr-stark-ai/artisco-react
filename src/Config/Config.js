import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC8oQHQcF0FIdNhgtPOV4COzUOABDRYr3g",
  authDomain: "test-eddce.firebaseapp.com",
  databaseURL: "https://test-eddce-default-rtdb.firebaseio.com",
  projectId: "test-eddce",
  storageBucket: "test-eddce.appspot.com",
  messagingSenderId: "752313460486",
  appId: "1:752313460486:web:3db772cbd7fb24af2b2087",
  measurementId: "G-J9XXFV7VYC"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}