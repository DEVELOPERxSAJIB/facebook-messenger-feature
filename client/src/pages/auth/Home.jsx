import "./auth.scss";
import { Link } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import PageHeader from "../../components/PageHeader/PageHeader";

const Home = () => {
  return (
    <>
      <PageHeader title={"Welcome to Messenger"} />
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-top">
            <AuthHeader
              title={"Welcome to Messenger"}
              desc={
                "The simple way to text call and video chat right from you desktop"
              }
            />
          </div>
          <div className="auth-bottom">
            <Link className="fb-bg" to="/login">
              Log in with Facebook
            </Link>
            <Link to="/login">Log in with Phone or Email</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
