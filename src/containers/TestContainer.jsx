import React from "react";

class TestContainer extends React.Component {
  render() {
    console.log("TEST CONTAINER");
    console.log(this.props);
    return <div>{window.location.pathname}</div>;
  }
}

export default TestContainer;
