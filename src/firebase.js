import  firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDLcMeDxGZqCMI_syaY2u1vjSAIA1r9zVU",
    authDomain: "instagram-clone-d4731.firebaseapp.com",
    projectId: "instagram-clone-d4731",
    storageBucket: "instagram-clone-d4731.appspot.com",
    messagingSenderId: "900008272351",
    appId: "1:900008272351:web:3457fcd589c357aa4e246a",
    measurementId: "G-VT0S550FNX"
});
  
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage};