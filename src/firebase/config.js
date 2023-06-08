import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDFlGk37Ur5_kGeIkdpegVaUn9tsEMzazc",
  authDomain: "vccp-358208.firebaseapp.com",
  projectId: "vccp-358208",
  storageBucket: "vccp-358208.appspot.com",
  messagingSenderId: "675063555947",
  appId: "1:675063555947:web:3a0d1c0ea9c2c2dbfd0e2e",
  measurementId: "G-PL44Q5GQBX"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// console.log(db)  

export { db, auth };
export default firebase; 