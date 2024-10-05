import { ReactQueryProvider } from "@modules/common/components/ReactQueryProvider/ReactQueryProvider";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import EachLearnItem from "@modules/LearnItems/components/EachLearnItem";
import CreateCooperation from "@modules/Cooperation/Create";
import CreateVacancies from "@modules/Vacancies/Create";
import CreateEmployees from "@modules/Employees/Create";
import Layout from "@modules/common/components/Layout";
import CreateReports from "@modules/Reports/Create";
import Login from "@modules/auth/components/Login";
import CreateEvents from "@modules/Events/Create";
import Cooperation from "@modules/Cooperation";
import CreateNews from "@modules/News/Create";
import LearnItems from "@modules/LearnItems";
import Vacancies from "@modules/Vacancies";
import Employees from "@modules/Employees";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Reports from "@modules/Reports";
import Events from "@modules/Events";
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
          <Routes>
            <Route element={<Navigate to={APP_PATHS.home} />} path="/" />
            <Route path={APP_PATHS.login} element={<Login />} />
            <Route element={<Layout />}>
              <Route element={<div>Home</div>} path={APP_PATHS.home} />
              <Route path={APP_PATHS.news}>
                <Route element={<News />} index />
                <Route element={<CreateNews />} path="create/:id?" />
              </Route>
              <Route path={APP_PATHS.cooperation}>
                <Route element={<Cooperation />} index />
                <Route element={<CreateCooperation />} path="create/:id?" />
              </Route>
              <Route path={APP_PATHS.vacancies}>
                <Route element={<Vacancies />} index />
                <Route element={<CreateVacancies />} path="create/:id?" />
              </Route>
              <Route path={APP_PATHS.employees}>
                <Route element={<Employees />} index />
                <Route element={<CreateEmployees />} path="create/:id?" />
              </Route>
              <Route path={APP_PATHS.reports}>
                <Route element={<Reports />} index />
                <Route element={<CreateReports />} path="create/:id?" />
              </Route>
              <Route path={APP_PATHS.events}>
                <Route element={<Events />} index />
                <Route element={<CreateEvents />} path="create/:id?" />
              </Route>
              <Route path={APP_PATHS.learnItems}>
                <Route element={<LearnItems />} index />
                <Route element={<EachLearnItem />} path=":id" />
              </Route>
              <Route element={<Navigate to={APP_PATHS.home} />} path="*" />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReactQueryProvider>
    </Provider>
  );
}
