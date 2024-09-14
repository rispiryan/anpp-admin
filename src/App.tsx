import { ReactQueryProvider } from "@modules/common/components/ReactQueryProvider/ReactQueryProvider";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import EachLearnItem from "@modules/LearnItems/components/EachLearnItem";
import EachNews from "@modules/News/components/EachNews";
import Layout from "@modules/common/components/Layout";
import UserProvider from "@modules/User/UserProvider";
import Cooperation from "@modules/cooperation";
import LearnItems from "@modules/LearnItems";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Login } from "@modules/User";
import News from "@modules/News";

import { setupStore } from "./store/setupStore";
import { APP_PATHS } from "./constants";

export function App() {
  const store = setupStore();

  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "8px",
              padding: "20px",
            },
            duration: 5000,
          }}
          position="bottom-right"
          reverseOrder={false}
        />
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
                <Route path={APP_PATHS.cooperation}>
                  <Route element={<Cooperation />} index />
                </Route>
                <Route path={APP_PATHS.learnItems}>
                  <Route element={<LearnItems />} index />
                  <Route element={<EachLearnItem />} path=":id" />
                </Route>
                <Route element={<Navigate to={APP_PATHS.home} />} path="*" />
              </Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </ReactQueryProvider>
    </Provider>
  );
}
