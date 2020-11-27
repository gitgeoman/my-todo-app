import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyADx4nVCOuuQvtMj1nIAOZx8hP5xGG8M1E",
  authDomain: "mytodoapp-46041.firebaseapp.com",
  databaseURL: "https://mytodoapp-46041.firebaseio.com",
  projectId: "mytodoapp-46041",
  storageBucket: "mytodoapp-46041.appspot.com",
  messagingSenderId: "968052412512",
  appId: "1:968052412512:web:ab4a3e49371978eeaa3305",
  measurementId: "G-R6FD3YX2TZ",
});
const db = firebaseApp.firestore();
export default db;
