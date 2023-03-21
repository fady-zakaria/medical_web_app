/*import {initializeApp } from 'firebase/app'
//import Firebase from 'firebase/app'
import {getStorage} from 'firebase/storage'
import 'firebase/firestore';
import Firebase from "firebase/compat/app";
//import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMW8FADQrz5u-yGmlfT28GxhA8WnJ-nYA",
  authDomain: "react-image-storage-97f83.firebaseapp.com",
  projectId: "react-image-storage-97f83",
  storageBucket: "react-image-storage-97f83.appspot.com",
  messagingSenderId: "195455475173",
  appId: "1:195455475173:web:5435fc4c5f727db626230c"
};

//export const app = initializeApp(firebaseConfig);
//export const db = 


const firebase = Firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = firebase.firestore();

export { app, db , storage};*/
//import Firebase from "firebase/compat/app";
import {initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
//import { initializeApp } from "firebase/app";
//import "firebase/auth";
//import "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCMW8FADQrz5u-yGmlfT28GxhA8WnJ-nYA",
  authDomain: "react-image-storage-97f83.firebaseapp.com",
  projectId: "react-image-storage-97f83",
  storageBucket: "react-image-storage-97f83.appspot.com",
  messagingSenderId: "195455475173",
  appId: "1:195455475173:web:5435fc4c5f727db626230c"
};

const app = initializeApp(firebaseConfig);
//const firebase = Firebase.initializeApp(firebaseConfig);

const storage = getStorage(app);
//const app = initializeApp(firebaseConfig);
const db = getFirestore();
//const db = firebase.firestore();

export { app, db ,storage };