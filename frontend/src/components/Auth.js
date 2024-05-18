import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Auth = withAuthInfo((props) => {
  const navigate = useNavigate();

  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions();
  // Or if you want to make links instead
  // const { getLoginPageUrl, getSignupPageUrl, getAccountPageUrl } = useHostedPageUrls()

  if (props.isLoggedIn) {
    navigate("/home");
    return (
      <div>
        window.location.href = "http://localhost:3000/home"
        <p>You are logged in as {props.user.email}</p>
        <button onClick={() => redirectToAccountPage()}>Account</button>
        <button onClick={() => logoutFunction(true)}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => redirectToLoginPage()}>Login</button>
        <button onClick={() => redirectToSignupPage()}>Signup</button>
      </div>
    );
  }
});

export default Auth;
