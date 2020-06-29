import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { connect } from "react-redux";

const GetMessageParams = (status) => {
  switch (status) {
    case 200:
      return { type: "success", title: "" };
    default:
      return { type: "error", title: "" };
  }
};

class Notification extends React.Component {
  componentWillReceiveProps = (nP) => {
    const { title, type } = GetMessageParams(nP.status);
    store.addNotification({
      title,
      message: nP.message,
      type: type,
      insert: "botton",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        // onScreen: true,
      },
    });
  };

  render() {
    return <ReactNotification />;
  }
}

const mapStateToProps = (state) => {
  const { message, status } = state.notification;
  return { message, status };
};

export default connect(mapStateToProps)(Notification);
