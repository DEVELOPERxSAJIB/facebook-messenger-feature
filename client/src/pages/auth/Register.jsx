import { Link } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/auth/authApiSlice";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { createNotify } from "../../utils/notifiComponent";
import MainLoader from "../../components/MainLoader/MainLoader";

const Register = () => {
  const dispatch = useDispatch();
  const { message, error, loader } = useSelector(getAuthData);

  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
    auth: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser(input));
    resetForm();
  };

  useEffect(() => {
    if (error) {
      createNotify({ title: error, msg: "", type: "danger" });
      dispatch(setMessageEmpty());
    }

    if (message) {
      createNotify({ title: message, msg: "", type: "success" });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <PageHeader title={"Messenger - Create account"} />
      <div className="auth-container">
        <div className="auth-wrapper">
          {loader && <MainLoader />}
          <div className="auth-top">
            <AuthHeader title={"Register as a new user "} />

            <div className="auth-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Email or Phone number"
                  name="auth"
                  value={input.auth}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                />
                <button
                  style={{ cursor: "pointer" }}
                  className="fb-bg-green"
                  type="submit"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
          <div className="auth-bottom">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
