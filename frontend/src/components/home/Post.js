import React, { useState } from "react";
import "./Post.scss";
import profileImage from "../../assets/images/profile_pic.jpg";
import artImage from "../../assets/images/art.png";
import upvote from "../../assets/icons/upvote.svg";
import downvote from "../../assets/icons/downvote.svg";

const Post = ({ portfolio }) => {
  let [follow, setFollow] = useState(false);
  let [followText, setFollowText] = useState("Follow");
  const handleFollow = () => {
    setFollow(!follow);
    setFollowText(follow ? "Follow" : "Following");
  };
  let [like, setLike] = useState(0);
  const handleUpvote = () => {
    setLike(like + 1);
  };
  const handleDownvote = () => {
    setLike(like - 1);
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="pic_info">
          <img
            src={profileImage}
            alt="Profile"
            className="post__profile-image"
          />
          <div className="user-info">
            <span className="user-name">Mahzabin Rashid Fariha</span>
            <span className="user-handle">@fabledfariha</span>
          </div>
        </div>
        {!portfolio && (
          <button
            className="follow-button"
            onClick={handleFollow}
            style={{
              backgroundColor: follow ? "#a55057" : null,
              color: follow ? "#fff" : null,
            }}
          >
            {followText}
          </button>
        )}
      </div>
      <img src={artImage} alt="Art" className="post__art-image" />
      <div className="post__footer">
        <span className="post__art-title">The Picasso</span>
        <div className="post__actions">
          <div className="downvote-button" onClick={handleDownvote}>
            <img src={downvote} />
          </div>
          <span className="likes">{like}</span>
          <div className="vote-buttons" onClick={handleUpvote}>
            <img src={upvote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
