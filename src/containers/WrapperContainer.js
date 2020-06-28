import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Banners from "../components";

import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Page404 from "./Page404";

const WrapperContainer = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact={true} component={Banners} />
        <Route path="/login" component={Login} />
        <Route path="/:id" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default WrapperContainer;
