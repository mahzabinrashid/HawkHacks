import React from "react";
import "./Podium.scss";
import profileImage from "../../assets/images/profile_pic.png";

const Podium = ({ topThree }) => {
  const defaultData = topThree.map((item, index) => ({
    ...item,
    image: profileImage,
    color:
      item.rank === 1
        ? "linear-gradient(rgb(158 144 232 / 80%) 0%, rgba(255, 255, 255, 0) 100%)"
        : item.rank === 2
        ? "linear-gradient(rgb(228 90 90 / 80%) 0%, rgba(255, 255, 255, 0) 90%)"
        : "linear-gradient(180deg, rgba(157, 208, 162, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
    height: item.rank === 1 ? "40vh" : item.rank === 2 ? "30vh" : "25vh",
  }));

  return (
    <div className="podium">
      {defaultData.map((item, index) => (
        <div
          key={index}
          className={`podium-item ${item.rank === 1 ? "first" : ""}`}
          style={{ background: item.color, height: item.height }}
        >
          <img
            src={item.image}
            alt={item.username}
            className="podium-item__image"
          />
          <span className="podium-item__handle">{item.handle}</span>
          <span className="podium-item__score">{item.score}</span>
          {item.rank === 1 && <div className="podium-item__crown">👑</div>}
        </div>
      ))}
    </div>
  );
};

export default Podium;
