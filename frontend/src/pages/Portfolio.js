import Post from "../components/home/Post";
import UserProfile from "../components/portfolio/UserProfile";
import "./Portfolio.scss"
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";
import { useEffect, useState } from "react";

const Portfolio = withAuthInfo((props) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!props.user || !props.user.email) {
          setError("User email is missing");
          console.error("User email is missing");
          return;
        }

        const filter = JSON.stringify({ email: props.user.email });
        console.log("Fetching data with filter:", filter);

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

        if (!response.ok) {
          console.error("Network response was not ok", response);
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Fetched data:", result);

        if (result && result.data && result.data.length > 0) {
          setUserData(result.data[0]);
        } else {
          setError("No user data found");
          console.error("No user data found in response:", result);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.user]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="portfolio">
      {userData ? (
        <>
          <UserProfile user={userData} />
          {userData.posts.map((post, index) => (
            <Post key={index} portfolio={true} post={userData} />
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
});

export default Portfolio;
