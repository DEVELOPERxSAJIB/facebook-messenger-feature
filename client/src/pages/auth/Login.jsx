import { Link } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import PageHeader from "../../components/PageHeader/PageHeader";

const Login = () => {
  return (
    <>
      <PageHeader title={"Messenger - Login"} />
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-top">
            <AuthHeader
              title={"Login to get started"}
            />

            <div className="auth-form">
              <form action="">
                <input type="text" placeholder="Email or Phone number" />
                <input type="text" placeholder="Password" />
                <button style={{cursor : "pointer"}} className="fb-bg" type="submit">Log in</button>
              </form>
            </div>

            <Link className="forgot" to="/forgot">Forgot you password?</Link>

          </div>
          <div className="auth-bottom">
            <Link to="/register">Create new account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
