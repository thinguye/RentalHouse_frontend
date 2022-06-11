import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// DASHBOARDS

import BasicDashboard from './Basic/';

// Layout

import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import AppHeader from '../../Layout/AppHeader';

const Dashboards = () => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`/dashboards`} component={BasicDashboard} />
                </div>
            </div>
        </div>
    </Fragment>
);

export default Dashboards;

