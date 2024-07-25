import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";

const Layout = () => (
  <>
    <div>header</div>
    <div className={styles.content}>
      <div className={styles.centralize}>
        <Outlet />
      </div>
    </div>
  </>
);

export default Layout;
