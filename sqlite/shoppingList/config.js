import firebase from "firebase";
import firebaseSecrets from "./firebaseSecrets";

const config = {
  apiKey: firebaseSecrets.apiKey,
  authDomain: firebaseSecrets.authDomain,
  databaseURL: firebaseSecrets.databaseURL,
  projectId: firebaseSecrets.projectId,
  storageBucket: firebaseSecrets.storageBucket,
  messagingSenderId: firebaseSecrets.messagingSenderId
};

const fire = firebase.initializeApp(config);

export default fire;
