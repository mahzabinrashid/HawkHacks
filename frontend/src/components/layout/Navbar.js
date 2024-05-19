import React from "react";
import "./Navbar.scss";
import profileImage from "../../assets/images/profile_pic.png";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";

const Navbar = withAuthInfo((props) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions();
  if (props.isLoggedIn) {
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
            <a href="/leaderboard">Leaderboard</a>
          </li>
          <li className="navbar__item">
            <a href="/apply">Apply</a>
          </li>
          <li className="navbar__item">
            <a href="/submit">Submit</a>
          </li>
          <li className="navbar__item">
            <a onClick={() => logoutFunction(true)}>Logout</a>
          </li>
        </ul>
        <div className="profile">
          {/* <div className="profile_pic">
            <img src={profileImage} alt="Profile" />
          </div> */}
        </div>
      </nav>
    );
  } else {
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
            <a href="/apply">Apply</a>
          </li>
          <li className="navbar__item">
            <a href="/leaderboard">Leaderboard</a>
          </li>
          <li className="navbar__item">
            <a href="/submit">Submit</a>
          </li>
          <li className="navbar__item">
            <a onClick={() => redirectToLoginPage()}>Login</a>
          </li>
          <li className="navbar__item">
            <a onClick={() => redirectToSignupPage()}>Signup</a>
          </li>
        </ul>
      </nav>
    );
  }
});

export default Navbar;
