import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7jxmo6MX0RQA6Lrk6uVIjleFfd6YK1w0",
  authDomain: "cryptowealth-1ebe1.firebaseapp.com",
  databaseURL:
    "https://cryptowealth-1ebe1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cryptowealth-1ebe1",
  storageBucket: "cryptowealth-1ebe1.appspot.com",
  messagingSenderId: "98744052326",
  appId: "1:98744052326:web:2009e0773f1bb24a43dba7",
  measurementId: "G-W35XN51B9H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
