import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Cookies from "js-cookie";
import { useEffect } from "react";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { activateUserByOTP } from "../../features/auth/authApiSlice";
import { createNotify } from "../../utils/notifiComponent";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import MainLoader from "../../components/MainLoader/MainLoader";

export const Activation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, loader } = useSelector(getAuthData);
  const token = Cookies.get("verificationToken");

  const { input, resetForm, handleInputChange } = useFormFields({
    otp: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(activateUserByOTP({ token, otp: input.otp }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (error) {
      createNotify({ title: error, msg: "", type: "danger" });
      dispatch(setMessageEmpty());
    }

    if (message) {
      createNotify({ title: message, msg: "", type: "success" });
      dispatch(setMessageEmpty());
      resetForm();
      navigate("/activation");
    }
  }, [dispatch, error, message, navigate, resetForm]);

  return (
    <>
      <PageHeader title={"Messenger - Activate Account"} />
      <div className="auth-container">
        <div className="auth-wrapper">
          {loader && <MainLoader />}
          <div className="auth-top">
            <AuthHeader
              title={"Activate your account"}
              desc={`Your activation email with a verification code
              has been successfully sent`}
            />

            <div className="auth-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Activation Code"
                  name="otp"
                  value={input.otp}
                  onChange={handleInputChange}
                />
                <button
                  style={{
                    cursor: "pointer",
                    backgroundImage:
                      "linear-gradient(to right, #f368e0, #1e90ff)",
                    color: "#fff",
                  }}
                  type="submit"
                >
                  Activate Now
                </button>
              </form>
            </div>

            <a
              style={{ marginTop: "25px", color: "#333", fontSize: "14px" }}
              href="#"
            >
              Resend Activation Link to s**************71@gmail.com
            </a>
          </div>
          <div className="auth-bottom">
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>
    </>
  );
};
