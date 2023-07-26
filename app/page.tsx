"use client";

import { useState } from "react";
import classnames from "classnames";

// import Cloud from "./assets/cloud.png";
// import Moon from "./assets/moon.png";

import styles from "./styles/page.module.css";

export default function Home() {
  const [numQuotes, setNumQuotes] = useState<Number>(0);
  const [showOverlay, setShowOverlay] = useState<Boolean>(false);

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
