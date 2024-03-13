import { Link } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import PageHeader from "../../components/PageHeader/PageHeader";

const Forgot = () => {
  return (
    <>
      <PageHeader title={"Messenger - Reset password"} />
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-top">
            <AuthHeader title={"Login to get started"} />

            <div className="auth-form">
              <form action="">
                <input type="text" placeholder="Email or Phone number" />
                <button
                  style={{ cursor: "pointer", backgroundImage: "linear-gradient(to right, #f368e0, #1e90ff)"
                  , color: "#fff" }}
                  type="submit"
                >
                  Reset Password
                </button>
              </form>
            </div>

          </div>
          <div className="auth-bottom">
            <Link to="/login">Login to you account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
