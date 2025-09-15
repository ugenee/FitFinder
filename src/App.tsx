import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./components/login"
import SignUp from "./components/signup"
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    // <AnimatePresence mode="wait">
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    // </AnimatePresence>
  )
}

export default App
