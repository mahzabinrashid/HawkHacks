import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
