import { useEffect, useState } from "react";

import { getProfileAction, logOutAction } from "@modules/auth/store/actions";
import { userSelector } from "@modules/auth/store/selectors";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import Popover from "@mui/material/Popover";

import { APP_PATHS } from "../../../../constants";

import styles from "./Layout.module.scss";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const user = useSelector(userSelector);
  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    if (localStorage.getItem("authToken")) {
      dispatch(logOutAction(localStorage.getItem("authToken") || ""));
    }

    localStorage.setItem("authToken", "");
    navigate(APP_PATHS.login);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerContentWrapper}>
          <Link to={APP_PATHS.news}>
            <Button variant="outlined">News</Button>
          </Link>
          <Link to={APP_PATHS.cooperation}>
            <Button variant="outlined">Cooperation</Button>
          </Link>
          <Link to={APP_PATHS.vacancies}>
            <Button variant="outlined">Vacancies</Button>
          </Link>
          <Link to={APP_PATHS.employees}>
            <Button variant="outlined">Employees</Button>
          </Link>
          <Link to={APP_PATHS.reports}>
            <Button variant="outlined">Reports</Button>
          </Link>
          <Link to={APP_PATHS.events}>
            <Button variant="outlined">Events</Button>
          </Link>
          <Link to={APP_PATHS.shopping}>
            <Button variant="outlined">Shopping</Button>
          </Link>
          <Link to={APP_PATHS.department}>
            <Button variant="outlined">Departments</Button>
          </Link>
          <Link to={APP_PATHS.education}>
            <Button variant="outlined">Education</Button>
          </Link>
        </div>
        <div className={styles.avatar}>
          <Typography sx={{ p: 2 }}>{user?.fullName || ""}</Typography>
          <Button onClick={handleClick}>
            {!!user && (
              <Avatar className={styles.firstCharacter} alt={user.fullName[0]}>
                {user.fullName[0]}
              </Avatar>
            )}
          </Button>
          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            onClose={handleClose}
            anchorEl={anchorEl}
            open={open}
            id={id}
          >
            <Typography sx={{ cursor: "pointer", p: 2 }} className={styles.item} onClick={logout}>
              Logout
            </Typography>
            <Typography
              onClick={() => navigate(APP_PATHS.changePassword)}
              sx={{ cursor: "pointer", p: 2 }}
              className={styles.item}
            >
              Change password
            </Typography>
          </Popover>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.centralize}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
