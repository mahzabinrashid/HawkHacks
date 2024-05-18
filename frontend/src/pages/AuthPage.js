import Auth from "../components/Auth";
import React, { useState, useEffect } from "react";

export default function AuthPage() {
    console.log("Testing")
    console.log(`${process.env.REACT_APP_NEURELO_API_KEY}`);
    useEffect(() => {
      // Define the async function for fetching data
      const fetchData = async () => {
        try {
          // Make the GET request
          const response = await fetch(
            "https://us-east-2.aws.neurelo.com/rest/users/66490b57aa28003c6f18a6aa",
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
  return (
    <div>
      <Auth />
    </div>
  );
}