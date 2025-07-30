import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgetPass from "./components/auth/ForgetPass";
import SignupPage from "./pages/SignupPage";
import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import TaskModal from "./components/TaskModal";
import SpinPage from "./pages/SpinPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgetPass />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task/:taskId"
            element={
              <ProtectedRoute>
                <TaskModal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/spin"
            element={
              <ProtectedRoute>
                <SpinPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
