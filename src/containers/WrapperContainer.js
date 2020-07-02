import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Banners from "../components/viewContainers/bannerList/BannerListContainer.jsx";

import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Page404 from "./Page404";
import Notification from "./Notification";
import "./index.css";

const WrapperContainer = () => {
  return (
    <BrowserRouter>
      <Notification />
      <Switch>
        <PrivateRoute path="/banners" component={Banners} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/:id" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default WrapperContainer;
