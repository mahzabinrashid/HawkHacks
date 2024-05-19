import React from "react";
import "./UserProfile.scss";
import profileImage from "../../assets/images/profile_pic.png";

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={profileImage} alt="Profile" className="user-profile__image" />
      <div className="user-profile__info">
        <h2 className="profile-name">{user.name}</h2>
        {/* <p className="user-profile-handle">@fabledfariha</p> */}
      </div>
      <div className="stats">
        <div className="stat">
          <span className="stat-number">{user.posts.length}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat">
          <span className="stat-number">100</span>
          <span className="stat-label">Community Points</span>
        </div>
        <div className="stat">
          <span className="stat-number">89</span>
          <span className="stat-label">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
