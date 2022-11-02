import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import { UserProvider } from "./contexts/user";
import ProtectedRoute from "./components/auth/protectedRoute";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/dashboard"} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
