import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login";
import SignUp from "./components/signup";
import Layout from "./components/layout";
import  HomePage  from "./components/homepage";
import ProtectedRoute from "./components/protectedroute";
import PublicRoute from "./components/publicroute";


function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes (login/signup) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* All protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          {/* Add more nested routes here */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
