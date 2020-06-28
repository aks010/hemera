import { Redirect, Route } from "react-router-dom";
import React from "react";

const UserAuthenticated = true;

const PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      render={(props) =>
        UserAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
