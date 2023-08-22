import  firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDdSDDSGLRJsXjWx95Us52s2PtAAU8WnqM",
  authDomain: "questionnaire-b3365.firebaseapp.com",
  projectId: "questionnaire-b3365",
  storageBucket: "questionnaire-b3365.appspot.com",
  messagingSenderId: "391247504855",
  appId: "1:391247504855:web:6959506c92f389d0239792"
};

firebase.initializeApp(firebaseConfig);
const firestore =firestore.firestore();

export {firestore};