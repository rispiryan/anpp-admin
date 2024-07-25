import { ReactQueryProvider } from "@modules/common/components/ReactQueryProvider/ReactQueryProvider";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import PrivateRoute from "@modules/common/components/PrivateRoute";
import Layout from "@modules/common/components/Layout";
import UserProvider from "@modules/User/UserProvider";
import { Login } from "@modules/User";

import { APP_PATHS } from "./constants";

export function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route element={<Navigate to={APP_PATHS.home} />} path="/" />
            <Route path={APP_PATHS.login} element={<Login />} />
            <Route element={<Layout />}>
              <Route
                element={
                  <PrivateRoute>
                    <div>Home</div>
                  </PrivateRoute>
                }
                path={APP_PATHS.home}
              />
              <Route element={<Navigate to={APP_PATHS.home} />} path="*" />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}
