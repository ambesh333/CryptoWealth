import React from "react";
import styles from "../style";
import { Billing, Clients, Footer, Stats, Hero } from "../components";

const mainPage = () => {
  return (
    <div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Billing />
          <Clients />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default mainPage;
