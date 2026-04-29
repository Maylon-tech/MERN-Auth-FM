import { Navigate, BrowserRouter as Route, Router, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        
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
