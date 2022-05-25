import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// BUTTONS

// Standard

import Rooms from './Rooms';
import AddRoom from './AddRoom';

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

import IconsExamples from './Icons';

// LIST GROUP

import ListGroupExample from './ListGroup';

// UTILITIES

import UtilitiesExamples from './Utilities';

// Layout
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';


const Elements = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Rooms */}

                    <Route path={`${match.url}/rooms`} component={Rooms} />

                    <Route path={`${match.url}/add/room`} component={AddRoom} />

                    <Route path={`${match.url}/room/details/:id`} component={Room} />

                    <Route path={`${match.url}/room/edit/:id`} component={EditRoom} />

                    <Route path={`${match.url}/room/add/bill/:id`} component={AddBill} />

                    <Route path={`${match.url}/room/add/guest/:id`} component={AddGuest} />

                    {/* Guests */}

                    <Route path={`${match.url}/guests`} component={Guests} />

                    <Route path={`${match.url}/guest/:id`} component={EditGuest} />

                    {/* Bills */}
                    <Route path={`${match.url}/bills`} component={Bills} />
                    {/* Bookings */}

                    <Route path={`${match.url}/bookings`} component={Bookings} />

                    {/* Repairs */}

                    <Route path={`${match.url}/repairs`} component={Repairs} />

                    {/* Icons */}

                    <Route path={`${match.url}/icons`} component={IconsExamples} />

                    {/* List Group */}

                    <Route path={`${match.url}/list-group`} component={ListGroupExample} />

                    {/* Utilities */}

                    <Route path={`${match.url}/utilities`} component={UtilitiesExamples} />
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Elements;