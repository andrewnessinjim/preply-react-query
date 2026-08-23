import { useState } from "react";
import { Link } from "react-router-dom";
import DependentPanel from "./DependentPanel";
import CombinedPanel from "./CombinedPanel";
import Intro from "./Intro";
import styles from "./DependentQueries.module.css";

function DependentQueries() {
  const [simulateFailure, setSimulateFailure] = useState(false);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro
          simulateFailure={simulateFailure}
          onSimulateFailureChange={setSimulateFailure}
        />

        <div className={styles.panels}>
          <DependentPanel simulateFailure={simulateFailure} />
          <CombinedPanel simulateFailure={simulateFailure} />
        </div>
      </div>
    </div>
  );
}

export default DependentQueries;
