import React from "react";

import styles from "../style";
import { useState, useEffect } from "react";

import ChartComponent from "../components/ChartComponent";
import { Footer } from "../components";

const NavLink = ({ href, label, current, icon, onClick }) => {
  const baseClasses =
    "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

  const activeClasses =
    "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";

  return (
    <li>
      <a
        href={href}
        className={current ? activeClasses : baseClasses}
        aria-current={current ? "page" : undefined}
        onClick={onClick}
      >
        {icon && <span className="sr-only">{label}</span>}
        {icon && icon}
        {!icon && label}
      </a>
    </li>
  );
};

const DataPage = () => {
  const [responseData, setResponseData] = useState([]);
  const [userId, setuserId] = useState(1);
  const [numPosts, setNumPosts] = useState(0);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Store the result of response.json() in a variable
      })
      .then((data) => {
        setResponseData(data);
        setNumPosts(data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  const prevIcon = (
    <svg
      className="w-2.5 h-2.5 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
  );

  const nextIcon = (
    <svg
      className="w-2.5 h-2.5 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  );
  const handlePrevious = () => {
    if (userId > 1) {
      setuserId(userId - 1);
    }
  };

  const handleNext = () => {
    const maxPages = 10;
    if (userId < maxPages) {
      setuserId(userId + 1);
    }
  };

  const totalPages = 10;

  const pageLinks = Array.from({ length: totalPages }, (_, i) => i + 1).map(
    (pageNum) => (
      <NavLink
        key={pageNum}
        onClick={() => setuserId(pageNum)}
        href="#"
        label={String(pageNum)}
        current={userId === pageNum}
      />
    )
  );

  return (
    <div className="min-h-screen">
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="grid grid-cols-5">
            <div className="col-span-2 p-4">
              <div
                className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative flex-col`}
              >
                <div className="flex-col mt-8">
                  <h2 className={styles.heading2}>
                    User-Centric <br className="sm:block hidden" /> Content
                    Insight
                  </h2>
                  <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    Explore an insightful data visualization showcasing the
                    percentage distribution of posts written by User in the
                    broader spectrum of total posts. Gain a comprehensive
                    understanding of user-specific content engagement through an
                    interactive pie chart, adding depth to your platform's
                    analytics
                  </p>
                </div>
                <ChartComponent numPosts={numPosts} userId={userId} />
              </div>
            </div>
            <div className="col-span-3 p-4">
              <div
                className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
              >
                <div className="flex justify-between items-center mb-6 mx-auto">
                  <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                      <NavLink
                        onClick={handlePrevious}
                        label="Previous"
                        icon={prevIcon}
                      />
                      {pageLinks}
                      <NavLink
                        onClick={handleNext}
                        label="Next"
                        icon={nextIcon}
                      />
                    </ul>
                  </nav>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                      Structured Insights Unveiled:
                      <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                        Embark on a detailed exploration of filtered post data
                        presented in a tabular format, offering a systematic
                        breakdown of key attributes such as ID, title, and body.
                        Unleash the power of structured information, enhancing
                        your analytical capabilities and providing a granular
                        view of each post within the dataset.
                      </p>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Body
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {responseData.map((product, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800">
                          <th
                            scope="row"
                            className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {product.id}
                          </th>
                          <td className="px-6 py-4 text-sm">{product.title}</td>
                          <td className="px-6 py-4 text-sm">{product.body}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DataPage;
