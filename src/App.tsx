import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROUTES } from "./utils/constants/routes"

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LoginPage />} />
      <Route 
        path={ROUTES.GAME}
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;