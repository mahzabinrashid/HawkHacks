import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";

import { useNavigate } from "react-router-dom";

const Auth = withAuthInfo((props) => {
  const navigate = useNavigate();

  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions();
  // Or if you want to make links instead
  // const { getLoginPageUrl, getSignupPageUrl, getAccountPageUrl } = useHostedPageUrls()

  if (props.isLoggedIn) {
    window.location.href = "/home";
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
