import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzwTGt5vU96JSilcbZLGJ9psFV0J63WgU",
  authDomain: "fir-18422.firebaseapp.com",
  projectId: "fir-18422",
  storageBucket: "fir-18422.appspot.com",
  messagingSenderId: "972008974334",
  appId: "1:972008974334:web:5f86f7ccd3faeae1ff82af"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
