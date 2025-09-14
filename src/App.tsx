import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import ProtectedRoute from "./routes/protected-route";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import { useAuth } from "./context/auth-context";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
