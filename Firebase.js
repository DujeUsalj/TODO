import firebase from "firebase";

const fireBaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBpm0nCy7gx2PvSMdXGwrc2Lo_oQWdhHFA",
  authDomain: "todo-d8891.firebaseapp.com",
  databaseURL: "https://todo-d8891.firebaseio.com",
  projectId: "todo-d8891",
  storageBucket: "todo-d8891.appspot.com",
  messagingSenderId: "533491728710",
  appId: "1:533491728710:web:bae5b28fff822e6b2b6547",
  measurementId: "G-B5N23QXM37",
});
const db = fireBaseApp.firestore();
export default db;
