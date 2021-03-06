import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

// DASHBOARDS
import Account from "./Account";
// Layout

import AppSidebar from "../../Layout/AppSidebar";
import AppHeader from "../../Layout/AppHeader";

const OtherAdmin = () => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={"/account"} component={Account} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default OtherAdmin;
