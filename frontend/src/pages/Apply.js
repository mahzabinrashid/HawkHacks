import React from "react";
import Box from "../components/apply/Box";
import "./Apply.scss";
import Grid from "@mui/material/Grid";
import AmazonLogo from "../assets/images/amazon.png";
// import GoogleLogo from "../../assets/images/google.png";
// import FacebookLogo from "../../assets/images/facebook.png";
// import AppleLogo from "../../assets/images/apple.png";
// import NetflixLogo from "../../assets/images/netflix.png";

const jobData = [
  {
    logo: AmazonLogo,
    company: "Amazon",
    description: "Design a modern, minimalist logo for Amazon Payment.",
    date: "18 May, 2023",
    reward: "$15,000",
  },
  {
    logo: AmazonLogo,
    company: "Google",
    description: "Create an interactive doodle for Google homepage.",
    date: "22 May, 2023",
    reward: "$20,000",
  },
  {
    logo: AmazonLogo,
    company: "Facebook",
    description: "Develop a dynamic ad campaign for Facebook Ads.",
    date: "25 May, 2023",
    reward: "$18,000",
  },
  {
    logo: AmazonLogo,
    company: "Apple",
    description: "Design an innovative app interface for Apple Health.",
    date: "28 May, 2023",
    reward: "$25,000",
  },
  {
    logo: AmazonLogo,
    company: "Netflix",
    description: "Create a cinematic trailer for a new Netflix series.",
    date: "30 May, 2023",
    reward: "$22,000",
  },
];

export default function Apply() {
  return (
    <div className="apply">
      <Grid container spacing={2}>
        {jobData.map((job, index) => (
          <Grid item xs={6} key={index}>
            <Box
              logo={job.logo}
              company={job.company}
              description={job.description}
              date={job.date}
              reward={job.reward}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
