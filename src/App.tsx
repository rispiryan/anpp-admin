import { ReactQueryProvider } from "@modules/common/components/ReactQueryProvider/ReactQueryProvider";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import EachNews from "@modules/News/components/EachNews";
import Layout from "@modules/common/components/Layout";
import UserProvider from "@modules/User/UserProvider";
import { Login } from "@modules/User";
import News from "@modules/News";

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
              <Route element={<div>Home</div>} path={APP_PATHS.home} />
              <Route path={APP_PATHS.news}>
                <Route element={<News />} index />
                <Route element={<EachNews />} path=":id" />
              </Route>
              <Route element={<Navigate to={APP_PATHS.home} />} path="*" />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}
