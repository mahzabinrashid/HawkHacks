import AuthPage from "./pages/AuthPage";
import axios from "axios";
import {
  BrowserRouter as Router,
  useRoutes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Portfolio from "./pages/Portfolio";
import Submit from "./pages/Submit";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Leaderboard from "./pages/Leaderboard";

export const getHelloMessage = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api");
    return response.data;
  } catch (error) {
    console.error("Error fetching hello message:", error);
    throw error;
  }
};

// routes
const Routes = () => {
  return useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/portfolio", element: <Portfolio /> },
    { path: "/submit", element: <Submit /> },
    { path: "/apply", element: <Apply /> },
    {path: "/leaderboard", element: <Leaderboard />},
    { path: "/", element: <AuthPage /> },
  ]);
};

const AppContent = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
