import React, { useState } from "react";
import styles from "../style";
import { Footer } from "../components";

import * as firebase from "firebase/app";
import "firebase/database";

const Transaction = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddressError, setWalletAddressError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [formData, setFormData] = useState({ walletAddress: "", amount: "" });
  const validateForm = () => {
    let isValid = true;

    // Validate Wallet Address
    if (!walletAddress.trim()) {
      setWalletAddressError("Wallet Address cannot be empty");
      isValid = false;
    } else if (!isValidEthereumAddress(walletAddress)) {
      setWalletAddressError("Invalid Ethereum address format");
      isValid = false;
    } else {
      setWalletAddressError("");
    }

    // Validate Amount
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue < 0 || amountValue > 10000) {
      setAmountError("Amount must be a number between 0 and 10,000");
      isValid = false;
    } else {
      setAmountError("");
    }

    return isValid;
  };

  const isValidEthereumAddress = (address) => {
    //0x742d35Cc6634C0532925a3b844Bc454e4438f44e

    return /^0x[0-9a-fA-F]{40}$/.test(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (validateForm()) {
      try {
        // Store data in Firebase
        await firebase
          .database()
          .ref("transactions")
          .push(formData)
          .then((ref) => {
            console.log("Data was saved successfully with ref:", ref.key);
          })
          .catch((error) => {
            console.error("Data could not be saved: ", error);
          });

        console.log("Form submitted successfully");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  // setFormData({ walletAddress, amount });
  return (
    <div style={{ height: "100vh" }}>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <section
            id="home"
            className={`flex md:flex-row flex-col ${styles.paddingY}`}
          >
            <div
              className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
            >
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                  Seamless <br className="sm:block hidden" />{" "}
                  <span className="text-gradient">Transactions</span>{" "}
                </h1>
              </div>

              <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
                Await
              </h1>
              <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                Experience hassle-free transactions on our dedicated page
                featuring a user-friendly form. Elevate your financial
                interactions with our streamlined and secure validation
                mechanisms.
              </p>
            </div>

            <div
              className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
            >
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
                      Wallet Address
                    </h4>
                  </label>
                  <input
                    type="text"
                    id="walletAddress"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${
                      walletAddressError && "border-red-500"
                    }`}
                    placeholder="0x..."
                    required
                  />
                  {walletAddressError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {walletAddressError}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
                      Amount
                    </h4>
                  </label>

                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${
                      amountError && "border-red-500"
                    }`}
                    placeholder="Enter amount"
                    required
                  />
                  {amountError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {amountError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
