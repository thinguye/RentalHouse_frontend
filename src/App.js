import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';

const Dashboards = lazy(() => import('./Admin/Dashboards'));
const RoomPage = lazy(() => import('./User/Room'));
const RoomDetail = lazy(() => import('./User/RoomDetail'));
const Manage = lazy(() => import('./Admin/Manage'));
const OtherAdmin = lazy(() => import('./Admin/OtherAdmin'));
const Home = lazy(() => import('./HomePage/components/Home'));
const Other = lazy(()=> import('./User/Other'));
const role = sessionStorage.getItem("role");
function setRedirect(){
    if (role==="admin"){
        return "/dashboard"
    }else if(role==="user"){
        return "/room"
    }
    return "/home"
}

function App() {
    
    return (
        <Fragment>
            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route index path="/home" component={Home} />
            </Suspense>

            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route path="/dashboards" component={Dashboards} />
            </Suspense>

            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route path="/manage" component={Manage} />
            </Suspense>
            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route path="/account" component={OtherAdmin} />
            </Suspense>

            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route path="/room" component={RoomPage} />
            </Suspense>
            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route path="/room-details" component={RoomDetail} />
            </Suspense>

            <Suspense fallback={<div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Vui lòng đợi giây lát...
                    </h6>
                </div>
            </div>}>
                <Route path="/account-room" component={Other} />
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to={setRedirect()} />
            )} />
            <ToastContainer />
        </Fragment>

    );
}

export default App;


