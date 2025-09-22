import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login";
import SignUp from "./components/signup";
import Layout from "./components/layout";
import { HomePage } from "./components/homepage";
import { AboutPage } from "./components/aboutpage";


function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth pages (no background) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />

      {/* All protected pages with layout and background */}
      <Route path="/*" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />

        {/* Add more nested routes here as needed */}
      </Route>
    </Routes>
  );
}

export default App;