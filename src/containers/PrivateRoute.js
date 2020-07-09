import { Redirect, Route } from "react-router-dom";
import React from "react";

import { isUserAuthenticated } from "../utils/Auth";

const PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      render={(props) =>
        isUserAuthenticated() ? (
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
