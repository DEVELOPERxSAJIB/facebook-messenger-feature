import { RouterProvider } from "react-router-dom";
import "./App.scss";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import { ReactNotifications } from 'react-notifications-component'
import "react-toastify/dist/ReactToastify.css";
import 'react-notifications-component/dist/theme.css'


function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <ReactNotifications />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
