import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// DASHBOARDS
import Account from './Account'
// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../LayoutUser/AppSidebar';

const Other = () => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`/account-room`} component={Account} />
                </div>
            </div>
        </div>
    </Fragment>
);

export default Other;

