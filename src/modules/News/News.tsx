import { Link } from "react-router-dom";

import { APP_PATHS } from "../../constants";

import styles from "./News.module.scss";

const News = () => {
  console.log("News");

  return (
    <div className={styles.container}>
      <h1>News List</h1>
      <div className={styles.list}>
        <Link className={styles.eachItem} to={`${APP_PATHS.news}/1`}>
          1
        </Link>
        <Link className={styles.eachItem} to={`${APP_PATHS.news}/2`}>
          2
        </Link>
        <Link className={styles.eachItem} to={`${APP_PATHS.news}/3`}>
          3
        </Link>
        <Link className={styles.eachItem} to={`${APP_PATHS.news}/4`}>
          4
        </Link>
      </div>
    </div>
  );
};

export default News;
