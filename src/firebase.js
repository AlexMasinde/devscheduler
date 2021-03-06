import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();
const auth = app.auth();
const storage = app.storage();

const database = {
  users: firestore.collection("users"),
  activities: firestore.collection("activities"),
  tasks: firestore.collection("project-tasks"),
  formatDocument: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
};

export { auth, storage, database, firebase };
