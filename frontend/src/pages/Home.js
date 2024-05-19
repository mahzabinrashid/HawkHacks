import "./Home.scss";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";

import Post from "../components/home/Post";
import { useEffect } from "react";
const Home = withAuthInfo((props) => {
    useEffect(() => {
      // Define the async function for fetching data
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://us-east-2.aws.neurelo.com/rest/users",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
              },
            }
          );
          // Check if the response is ok (status code 200-299)
          if (!response.ok) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          // Parse the JSON from the response
          const result = await response.json();
          // Set the fetched data to the state
          console.log(result);
        } catch (error) {
          // Set the error to the state
          console.log(error.message);
        }
      };

      // Call the fetch function
      fetchData();
    }, []);

  console.log(props.user);
  if (props.user != null) {
    const fetchData = async () => {
      try {
        // Make the GET request
        const filter = JSON.stringify({ email: props.user.email });
        const response = await fetch(
          `https://us-east-2.aws.neurelo.com/rest/users?filter=${encodeURIComponent(
            filter
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
            },
          }
        );
        const result = await response.json();
        // Set the fetched data to the state
        if (result.data.length === 0) {
          const data = {
            "email": props.user.email,
          };
          const response = await fetch(
            "https://us-east-2.aws.neurelo.com/rest/users/__one",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": `${process.env.REACT_APP_NEURELO_API_KEY}`,
              },
              body: JSON.stringify(data),
            }
          );
          console.log(response);
        }
      } catch (error) {
        // Set the error to the state
        console.log(error.message);
      }
    };
    fetchData();
  }

  return (
    <div className="home">
      <Post portfolio={false} />
      <Post portfolio={false} />
      <Post portfolio={false} />
    </div>
  );
});

export default Home;
