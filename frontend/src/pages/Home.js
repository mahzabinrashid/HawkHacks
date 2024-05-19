import "./Home.scss";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";
import Post from "../components/home/Post";
import { useEffect, useState } from "react";

const Home = withAuthInfo((props) => {
  const [posts, setPosts] = useState([]);

  console.log(props.user);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
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
        if (result.data.length === 0) {
          const data = {
            email: props.user.email,
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
        console.log(error.message);
      }
    };
    const fetchData2 = async () => {
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
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setPosts(result.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData2();
    fetchData1();
  }, []);

  return (
    <div className="home">
      {posts.map((post, index) => (
        <Post key={index} portfolio={false} post={post} />
      ))}
    </div>
  );
});

export default Home;
