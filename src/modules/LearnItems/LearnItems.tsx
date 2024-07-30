import { Link } from "react-router-dom";

import { APP_PATHS } from "../../constants";

import styles from "./LearnItems.module.scss";

const LearnItems = () => {
  console.log("LearnItems");

  return (
    <div className={styles.container}>
      <h1>Learn Items</h1>
      <div className={styles.list}>
        <Link to={`${APP_PATHS.learnItems}/1`} className={styles.eachItem}>
          1
        </Link>
        <Link to={`${APP_PATHS.learnItems}/2`} className={styles.eachItem}>
          2
        </Link>
        <Link to={`${APP_PATHS.learnItems}/3`} className={styles.eachItem}>
          3
        </Link>
        <Link to={`${APP_PATHS.learnItems}/4`} className={styles.eachItem}>
          4
        </Link>
      </div>
    </div>
  );
};

export default LearnItems;
