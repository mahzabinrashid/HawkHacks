import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export const getHelloMessage = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api");
    return response.data;
  } catch (error) {
    console.error("Error fetching hello message:", error);
    throw error;
  }
};

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const helloMessage = await getHelloMessage();
        setMessage(helloMessage);
      } catch (error) {
        console.error("Error fetching hello message:", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <p> {message}</p>
    </div>
  );
}

export default App;
