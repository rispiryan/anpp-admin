import { type PropsWithChildren, type ReactNode, useEffect, type FC } from "react";

import { useUser } from "@modules/User/hooks/useUser";
import { useNavigate } from "react-router-dom";

interface IProps {
  showDefaultAccessDenied?: boolean;
  accessDeniedComponent?: ReactNode;
  accessDeniedUrl?: string;
}

const PrivateRoute: FC<PropsWithChildren<IProps>> = ({
  // showDefaultAccessDenied = false,
  accessDeniedUrl = "/login",
  // accessDeniedComponent,
  children,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(accessDeniedUrl);
    }
  }, [navigate, accessDeniedUrl, isAuthenticated]);

  return <>{isAuthenticated && children}</>;
};

export default PrivateRoute;
