"use client";

import { useEffect, useState } from "react";
import classnames from "classnames";
import { API } from "aws-amplify";

// import Cloud from "./assets/cloud.png";
// import Moon from "./assets/moon.png";

import styles from "@/styles/page.module.css";
import { quoteQueryName } from "@/src/graphql/queries";

// interface for DynamoDB object
interface UpdateQuoteData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}

// type guard for fetch function

export default function Home() {
  const [numQuotes, setNumQuotes] = useState<Number>(0);
  const [showOverlay, setShowOverlay] = useState<Boolean>(false);

  // fetch DynamoDB object for number of quotes generated
  const updateNumQuote = async () => {
    try {
      const response = await API.graphql<UpdateQuoteData>({
        query: quoteQueryName,
        authMode: "AWS_IAM",
        variables: {
          queryName: "numQuotes",
        },
      });
      console.log("response :>> ", response);
    } catch (error) {
      console.log("Error getting number of quotes generated :>> ", error);
    }
  };

  useEffect(() => {
    updateNumQuote();
  }, []);

  return (
    <main>
      {/* Quote Generator */}
      <div>
        <button
          className={styles.primaryButton}
          onClick={() => setShowOverlay(!showOverlay)}
        >
          Generate a Quote
        </button>
      </div>

      {/* Quote Modal Pop-Up */}
      <div
        className={classnames(styles.glassmorph, {
          [styles.hidden]: !showOverlay,
        })}
      >
        Inspirating quote here...
      </div>

      <div className={styles.footer}>
        total quotes generated: {numQuotes}
        <br />
        developed with ♥ by{" "}
        <a
          href="https://github.com/tt954"
          target="_blank"
          rel="noopener noreferrer"
        >
          @tt954
        </a>
      </div>
    </main>
  );
}
