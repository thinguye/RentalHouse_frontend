import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// DASHBOARDS

import Room from './Basic';
// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../LayoutUser/AppSidebar';

const RoomPage = () => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`/room`} component={Room} />
                </div>
            </div>
        </div>
    </Fragment>
);

export default RoomPage;

