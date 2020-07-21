import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { connect } from "react-redux";

import { DisplayNotification } from "../actions/index";

const GetMessageParams = (status) => {
  switch (status) {
    case 200:
      return { type: "success", title: "" };
    default:
      return { type: "danger", title: "" };
  }
};

class Notification extends React.Component {
  componentWillReceiveProps = (nP) => {
    console.log("cAlle");
    console.log(nP);
    if (nP.message) {
      const { title, type } = GetMessageParams(nP.status);
      console.log("TYPE: " + type);
      store.addNotification({
        title,
        message: nP.message,
        type: type,
        insert: "botton",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000,
          // onScreen: true,
        },
      });
      this.props.DisplayNotification("");
    }
  };

  render() {
    return <ReactNotification />;
  }
}

const mapStateToProps = (state) => {
  // console.log("CALLED");
  // console.log(state.notification);
  const { message, status } = state.notification;
  return { message, status };
};

export default connect(mapStateToProps, { DisplayNotification })(Notification);
