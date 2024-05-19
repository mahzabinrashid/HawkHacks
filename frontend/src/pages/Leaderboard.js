import React from "react";
import "./Leaderboard.scss";
import Podium from "../components/leaderboard/Podium";

const Leaderboard = () => {
  const data = [
    { rank: 1, username: "Jack Wilson", handle: "@jack", score: 87 },
    { rank: 2, username: "George Brown", handle: "@george", score: 84 },
    { rank: 3, username: "Bob Smith", handle: "@bob", score: 52 },
    { rank: 4, username: "Charlie Davis", handle: "@charlie", score: 52 },
    { rank: 5, username: "Alice Johnson", handle: "@alice", score: 51 },
    { rank: 6, username: "Edward King", handle: "@edward", score: 50 },
    { rank: 7, username: "Fiona White", handle: "@fiona", score: 36 },
    { rank: 8, username: "Diana Moore", handle: "@diana", score: 28 },
    { rank: 9, username: "Ivy Black", handle: "@ivy", score: 28 },
    { rank: 10, username: "Hannah Green", handle: "@hannah", score: 15 },
  ];

  // Sort data by score
  const sortedData = data.sort((a, b) => b.score - a.score);

  // Extract top 3 for podium
  const topThree = sortedData.slice(0, 3);

  return (
    <div className="leaderboard">
      <Podium topThree={topThree} />
      <div className="leaderboard-header">
        <span>Rank</span>
        <span>Username</span>
        <span>Score</span>
      </div>
      {sortedData.map((item, index) => (
        <div className="leaderboard-item" key={index}>
          <span>{index + 1}</span>
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
