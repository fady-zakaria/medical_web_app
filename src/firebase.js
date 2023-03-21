import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCMW8FADQrz5u-yGmlfT28GxhA8WnJ-nYA",
  authDomain: "react-image-storage-97f83.firebaseapp.com",
  projectId: "react-image-storage-97f83",
  storageBucket: "react-image-storage-97f83.appspot.com",
  messagingSenderId: "195455475173",
  appId: "1:195455475173:web:5435fc4c5f727db626230c"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);