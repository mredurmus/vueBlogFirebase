import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyA2GvARH77WPwWkMYSIlJCjZxFOOIIGlUo",
    authDomain: "dtap-blog.firebaseapp.com",
    projectId: "dtap-blog",
    storageBucket: "dtap-blog.appspot.com",
    messagingSenderId: "1050430635128",
    appId: "1:1050430635128:web:ee01847da3a208552bc18d"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();