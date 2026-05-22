import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage
from "./pages/LandingPage";

import Register
from "./pages/Register";

import ApplicantDashboard
from "./pages/ApplicantDashboard";

import Login
from "./pages/Login";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<ApplicantDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;