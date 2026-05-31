import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterHospital from "./pages/RegisterHospital";
import RegisterReceiver from "./pages/RegisterReceiver";

import HospitalDashboard from "./pages/HospitalDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";

import AvailableBlood from "./pages/AvailableBlood";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register-hospital"
          element={<RegisterHospital />}
        />

        <Route
          path="/register-receiver"
          element={<RegisterReceiver />}
        />

        <Route
  path="/hospital-dashboard"
  element={
    <ProtectedRoute role="hospital">
      <HospitalDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/receiver-dashboard"
  element={
    <ProtectedRoute role="receiver">
      <ReceiverDashboard />
    </ProtectedRoute>
  }
/>

     <Route
  path="/available-blood"
  element={<AvailableBlood />}
/>  

      </Routes>
    </BrowserRouter>
  );
}

export default App;