import PrivateRoute from "@modules/common/components/PrivateRoute";
import { Outlet, Link } from "react-router-dom";

import { APP_PATHS } from "../../../../constants";

import styles from "./Layout.module.scss";

const Layout = () => (
  <>
    <div className={styles.headerContainer}>
      <div className={styles.headerContentWrapper}>
        <Link to={APP_PATHS.news}>News</Link>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.centralize}>
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      </div>
    </div>
  </>
);

export default Layout;
