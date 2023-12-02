import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./screens/mainPage";
import TransactionPage from "./screens/Transaction";
import DataPage from "./screens/DataPage";
import Navbar from "./components/Navbar";
import styles from "./style";

import * as firebase from "firebase/app";
import "firebase/database";

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

firebase.initializeApp(firebaseConfig);

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
