import { Link } from "react-router-dom";

const AuthHeader = ({ title, desc }) => {
  return (
    <div>
      <Link to="/authentication">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png"
          alt=""
        />
      </Link>
      <h1>{title}</h1>
      <p style={{maxWidth: "700px"}} dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  );
};

export default AuthHeader;
