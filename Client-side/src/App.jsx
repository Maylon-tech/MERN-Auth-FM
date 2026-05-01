import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import ProtectedRoute from "./components/ProtectedRoute"
import Analytics from "./pages/Analytics"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
