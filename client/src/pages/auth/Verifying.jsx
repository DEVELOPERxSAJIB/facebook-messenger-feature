import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activateUserByLink } from "../../features/auth/authApiSlice";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { createNotify } from "../../utils/notifiComponent";

export const Verifying = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector(getAuthData);

  useEffect(() => {
    dispatch(activateUserByLink(params.token));
  }, [dispatch, params.token]);

  useEffect(() => {
    if (error) {
      createNotify({ title: error, msg: "", type: "danger" });
      dispatch(setMessageEmpty());
    }

    if (message) {
      createNotify({ title: message, msg: "", type: "success" });
      dispatch(setMessageEmpty());
      navigate("/login");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="verify-loader">
      <div className="loader">
        {message
          ? "We are verifying your account Please do not exit from this page."
          : <h4 style={{ color : "rebeccapurple" }}>Link is already used or expired</h4>}
      </div>
      <div className="loader-2"></div>
    </div>
  );
};
