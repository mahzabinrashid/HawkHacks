import React from "react";
import "./Navbar.scss";
import profileImage from "../../assets/images/profile_pic.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">B R S H</div>
      <ul className="navbar__links">
        <li className="navbar__item">
          <a href="/home">Home</a>
        </li>
        <li className="navbar__item">
          <a href="/portfolio">Portfolio</a>
        </li>
        <li className="navbar__item">
          <a href="/submit">Submit</a>
        </li>
      </ul>
      <div className="profile">
        <div className="profile_pic">
          <img src={profileImage} alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
