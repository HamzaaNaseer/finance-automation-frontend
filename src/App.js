import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//ICONS IMPORT
import { FiSettings } from "react-icons/fi";

//COMPONENTS IMPORT
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

//FILES IMPORT
import {
  Navbar,
  Sidebar,
  ThemeSettings,
  ProtectedRoute,
} from "./components";

//CONTEXTS IMPORTS
import { useStateContext } from "./contexts/ContextProvider";

import {
  Dashboard,
  Pie,
  Login,
  Docs,
  Queries,
  ModuleFinances,
  FinancialManagement,
  ProjectManagement,
} from "./pages";

import "./App.css";
import DonorProtection from "./components/DonerProtection";

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4 z-50">
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white rounded-[50%]"
                onClick={() => {
                  setThemeSettings(true);
                }}
                style={{ background: currentColor }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* DASHBOARD */}
                <Route path="/" element={<Login />} />
                <Route exact path="/dashboard" element={<ProtectedRoute />}>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                </Route>

                {/* PAGES */}
                <Route
                  exact
                  path="/Project-Management"
                  element={<DonorProtection />}
                >
                  <Route
                    exact
                    path="/Project-Management"
                    element={<ProjectManagement />}
                  />
                </Route>
                <Route
                  exact
                  path="/Financial-Management"
                  element={<ProtectedRoute />}
                >
                  <Route
                    exact
                    path="/Financial-Management"
                    element={<FinancialManagement />}
                  />
                </Route>
                <Route exact path="/Docs" element={<ProtectedRoute />}>
                  <Route exact path="/Docs" element={<Docs />} />
                </Route>
                <Route exact path="/Queries" element={<ProtectedRoute />}>
                  <Route exact path="/Queries" element={<Queries />} />
                </Route>

                <Route path="/login" element={<Login />} />

                {/* Charts */}
              

                <Route
                  exact
                  path="/Modules-Progress"
                  element={<ProtectedRoute />}
                >
                  <Route exact path="/Modules-Progress" element={<Pie />} />
                </Route>

                <Route
                  exact
                  path="/Modules-Finances"
                  element={<ProtectedRoute />}
                >
                  <Route
                    exact
                    path="/Modules-Finances"
                    element={<ModuleFinances />}
                  />
                </Route>
                
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
