import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// DASHBOARDS

import BillByRoom from './Bills';
import GuestByRoom from './Guests';
import Repairs from './Repairs';
// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../LayoutUser/AppSidebar';

const RoomDetail = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/bills`} component={BillByRoom} />
                    <Route path={`${match.url}/guests`} component={GuestByRoom} />
                    <Route path={`${match.url}/repairs`} component={Repairs} />
                </div>
            </div>
        </div>
    </Fragment>
);

export default RoomDetail;

