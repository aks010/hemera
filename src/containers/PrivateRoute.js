import { Redirect, Route } from "react-router-dom";
import React from "react";

import { isUserAuthenticated } from "../utils/Auth";
import Header from "./Header";

const PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      render={(props) =>
        isUserAuthenticated() ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
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
