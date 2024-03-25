import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields";
import { loginUser } from "../../features/auth/authApiSlice";
import { useEffect } from "react";
import { createNotify } from "../../utils/notifiComponent";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../../components/MainLoader/MainLoader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, loader, user } = useSelector(getAuthData);

  const { input, handleInputChange, resetForm } = useFormFields({
    auth: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(input));
  };

  useEffect(() => {
    if (error) {
      createNotify({ title: error, msg: "", type: "danger" });
      dispatch(setMessageEmpty());
    }

    if (message) {
      createNotify({ title: message, msg: "", type: "success" });
      dispatch(setMessageEmpty());
      resetForm();
    }
    
    if(user) {
      navigate("/")
    }
  })

  return (
    <>
      <PageHeader title={"Messenger - Login"} />
      <div className="auth-container">
        <div className="auth-wrapper">
          {loader && <MainLoader />}
          <div className="auth-top">
            <AuthHeader title={"Login to get started"} />

            <div className="auth-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Email or Phone number"
                  name="auth"
                  value={input.auth}
                  onChange={handleInputChange}
                />
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                />
                <button
                  style={{ cursor: "pointer" }}
                  className="fb-bg"
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>

            <Link className="forgot" to="/forgot">
              Forgot you password?
            </Link>
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
