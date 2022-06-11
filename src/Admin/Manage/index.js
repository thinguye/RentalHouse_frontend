import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// BUTTONS

// Standard

import Rooms from './Rooms';

// DROPDOWNS
import Room from './Room/Information';
import AddGuest from './Room/Add/Guest';
import EditRoom from './Room/EditRoom';
import AddBill from './Room/Add/Bill';

import Guests from './Guests';
import EditGuest from './EditGuestProfile';

// BADGES & LABELS

import Bookings from './Bookings';

import Repairs from './Repairs';

import Bills from './Bills';
// ICONS

// Layout
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import AppHeader from '../../Layout/AppHeader';
import ResetPassword from './ResetPassword';


const Manage = () => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Rooms */}

                    <Route path={`/manage/rooms`} component={Rooms} />

                    <Route path={`/manage/guests`} component={Guests} />

                    <Route path={`/manage/room/details`} component={Room} />

                    <Route path={`/manage/room/edit`} component={EditRoom} />

                    <Route path={`/manage/room/add/bill`} component={AddBill} />

                    <Route path={`/manage/room/add/guest`} component={AddGuest} />

                    {/* Guests */}



                    <Route path={`/manage/guest`} component={EditGuest} />

                    {/* Bills */}
                    <Route path={`/manage/bills`} component={Bills} />
                    {/* Bookings */}

                    <Route path={`/manage/bookings`} component={Bookings} />

                    {/* Repairs */}

                    <Route path={`/manage/repairs`} component={Repairs} />

                    <Route path={`/manage/reset-password`} component={ResetPassword}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Manage;