import React from "react";
import "./Leaderboard.scss";

const Leaderboard = () => {
  const data = [
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
    },
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
    },
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
    },
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
    },
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
    },
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
    },
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
    },
  ];

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <span>Rank</span>
        <span>Username</span>
        <span>Score</span>
      </div>
      {data.map((item, index) => (
        <div className="leaderboard-item" key={index}>
          <span>{item.rank}</span>
          <div className="leaderboard-username">
            <span className="leaderboard-name">{item.username}</span>
            <span className="leaderboard-handle">{item.handle}</span>
          </div>
          <span>{item.score}</span>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
