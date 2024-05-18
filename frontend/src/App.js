import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import Submit from "./pages/Submit";

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
  ]);
};

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     try {
  //       const helloMessage = await getHelloMessage();
  //       setMessage(helloMessage);
  //     } catch (error) {
  //       console.error("Error fetching hello message:", error);
  //     }
  //   };

  //   fetchMessage();
  // }, []);

  return (
    <div>
      <Navbar />
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
