import { Store } from "react-notifications-component";

export const createNotify = ({ title, msg, type="success" }) => {
  Store.addNotification({
    title: title,
    message: msg,
    type: type,
    insert: "top-center",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    showIcon : true,
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};
