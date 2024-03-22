import "./MainLoader.scss";
import { Oval } from "react-loader-spinner";

const MainLoader = () => {
  return (
    <div className="main-container">
      <div className="loader-item">
        <Oval
          visible={true}
          height="50"
          width="50"
          color="#0083FF"
          ariaLabel="oval-loading"
          secondaryColor="#00FFFFFFFFFFF"
          strokeWidth="4"
        />
      </div>
    </div>
  );
};

export default MainLoader;
