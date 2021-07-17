import  firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp(
{
    apiKey: "AIzaSyCREi-lsoVPcv9n21ateHM757ZKqqAgjRE",
    authDomain: "instagram-clone-44e23.firebaseapp.com",
    projectId: "instagram-clone-44e23",
    storageBucket: "instagram-clone-44e23.appspot.com",
    messagingSenderId: "77461413957",
    appId: "1:77461413957:web:238afd5fa6029532db832c",
    measurementId: "G-MWY9PGBWTF"
  });
  
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage};