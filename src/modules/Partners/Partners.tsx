import { Link } from "react-router-dom";

import { APP_PATHS } from "../../constants";

import styles from "./Partners.module.scss";

const Partners = () => {
  console.log("Partners");

  return (
    <div className={styles.container}>
      <h1>Partners List</h1>
      <div className={styles.list}>
        <Link to={`${APP_PATHS.partners}/1`} className={styles.eachItem}>
          1
        </Link>
        <Link to={`${APP_PATHS.partners}/2`} className={styles.eachItem}>
          2
        </Link>
        <Link to={`${APP_PATHS.partners}/3`} className={styles.eachItem}>
          3
        </Link>
        <Link to={`${APP_PATHS.partners}/4`} className={styles.eachItem}>
          4
        </Link>
      </div>
    </div>
  );
};

export default Partners;
