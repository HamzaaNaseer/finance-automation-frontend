import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//ICONS IMPORT
import { FiSettings } from "react-icons/fi";

//COMPONENTS IMPORT
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

//FILES IMPORT
import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
  ProtectedRoute,
} from "./components";

//CONTEXTS IMPORTS
import { useStateContext } from "./contexts/ContextProvider";

import {
  Dashboard,
  Area,
  Bar,
  ColorMapping,
  Financial,
  Line,
  Pie,
  Pyramid,
  Login,
  UsersCount,
  Docs,
  Queries,
} from "./pages";

import "./App.css";


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
                  <Route exact path="/dashboard" element={<Docs />} />
                </Route>

                {/* PAGES */}
                <Route exact path="/Project-Management" element={<ProtectedRoute />}>
                  <Route exact path="/Project-Management" element={<Docs />} />
                </Route>
                <Route exact path="/Financial-Management" element={<ProtectedRoute />}>
                  <Route exact path="/Financial-Management" element={<Docs />} />
                </Route>
                <Route exact path="/Docs" element={<ProtectedRoute />}>
                  <Route exact path="/Docs" element={<Docs />} />
                </Route>
                <Route exact path="/Queries" element={<ProtectedRoute />}>
                  <Route exact path="/Queries" element={<Queries />} />
                </Route>

                

                <Route path="/login" element={<Login />} />

                {/* Charts */}
                <Route exact path="/line" element={<ProtectedRoute />}>
                  <Route exact path="/line" element={<Line />} />
                </Route>
                <Route exact path="/area" element={<ProtectedRoute />}>
                  <Route exact path="/area" element={<Area />} />
                </Route>
                <Route exact path="/bar" element={<ProtectedRoute />}>
                  <Route exact path="/bar" element={<Bar />} />
                </Route>
                <Route exact path="/pie" element={<ProtectedRoute />}>
                  <Route exact path="/pie" element={<Pie />} />
                </Route>
                <Route exact path="/financial" element={<ProtectedRoute />}>
                  <Route exact path="/financial" element={<Financial />} />
                </Route>
                <Route exact path="/color-mapping" element={<ProtectedRoute />}>
                  <Route
                    exact
                    path="/color-mapping"
                    element={<ColorMapping />}
                  />
                </Route>
                <Route
                  exact
                  path="/Frequent-Complaints"
                  element={<ProtectedRoute />}
                >
                  <Route exact path="/Frequent-Complaints" element={<Pie />} />
                </Route>
                <Route
                  exact
                  path="/Block-Wise-Complaints"
                  element={<ProtectedRoute />}
                >
                  <Route
                    exact
                    path="/Block-Wise-Complaints"
                    element={<Pyramid />}
                  />
                </Route>

                <Route exact path="/users-count" element={<ProtectedRoute />}>
                  <Route exact path="/users-count" element={<UsersCount />} />
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
