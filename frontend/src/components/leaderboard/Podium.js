import React from "react";
import "./Podium.scss";
import profileImage from "../../assets/images/profile_pic.jpg";
const Podium = () => {
  const data = [
    {
      rank: 1,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
      image: profileImage,
      color:
        "linear-gradient(rgb(228 90 90 / 80%) 0%, rgba(255, 255, 255, 0) 90%)",
      height: "30vh",
    },
    {
      rank: 2,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
      image: profileImage,
      color:
        "linear-gradient(rgb(158 144 232 / 80%) 0%, rgba(255, 255, 255, 0) 100%)",
      height: "40vh",
    },
    {
      rank: 3,
      username: "Mahzabin Rashid Fariha",
      handle: "@fabledfariha",
      score: 53,
      image: profileImage,
      color:
        "linear-gradient(180deg, rgba(157, 208, 162, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
      height: "25vh",
    },
  ];

  return (
    <div className="podium">
      {data.map((item, index) => (
        <div
          key={index}
          className="podium-item"
          style={{ background: item.color, height: item.height }}
        >
          <img
            src={item.image}
            alt={item.username}
            className="podium-item__image"
          />
          <span className="podium-item__handle">{item.handle}</span>
          <span className="podium-item__score">{item.score}</span>
          {item.rank === 2 && <div className="podium-item__crown">👑</div>}
        </div>
      ))}
    </div>
  );
};

export default Podium;
