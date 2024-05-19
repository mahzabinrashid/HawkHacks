import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/react";
import "./Auth.scss";
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
      <div className="auth">
        <div className="auth_container">
          <h1>BRSH</h1>
          <p>Create . Compete . Conquer</p>
          <div className="button_container">
            <button className="sign_up" onClick={() => redirectToSignupPage()}>
              Sign Up
            </button>
            <button className="sign_in" onClick={() => redirectToLoginPage()}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default Auth;
