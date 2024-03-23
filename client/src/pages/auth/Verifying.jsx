import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const Verifying = () => {
  const navigate = useNavigate();
  const params = useParams();

  console.log(params.token);

  // check registration device or not
  const verificationToken = Cookies.get("verificationToken");
  useEffect(() => {
    if (!verificationToken) {
      navigate("/login");
    }
  }, [navigate, verificationToken]);

  return (
    <div className="verify-loader">
      <div className="loader">
        We are verifying your account Please do not exit from this page.
      </div>
      <div className="loader-2"></div>
    </div>
  );
};
