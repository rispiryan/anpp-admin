import PrivateRoute from "@modules/common/components/PrivateRoute";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@mui/material";

import { APP_PATHS } from "../../../../constants";

import styles from "./Layout.module.scss";

const Layout = () => (
  <>
    <div className={styles.headerContainer}>
      <div className={styles.headerContentWrapper}>
        <Link to={APP_PATHS.news}>
          <Button variant="outlined">News</Button>
        </Link>
        <Link to={APP_PATHS.partners}>
          <Button variant="outlined">Partners</Button>
        </Link>
        <Link to={APP_PATHS.learnItems}>
          <Button variant="outlined">Learn Items</Button>
        </Link>
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
