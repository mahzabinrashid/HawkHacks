import Post from "../components/home/Post";
import UserProfile from "../components/portfolio/UserProfile";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";
import { useEffect } from "react";

const Portfolio = withAuthInfo((props) => {
  useEffect(() => {
    // Define the async function for fetching data
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
        console.log(result)
      } catch (error) {
        // Set the error to the state
        console.log(error.message);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  return (
    <div>
      <UserProfile />
      <Post portfolio={true}/>
      <Post portfolio={true}/>
    </div>
  );
})

export default Portfolio;
