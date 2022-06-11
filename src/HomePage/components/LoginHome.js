import React from 'react';
import{BrowserRouter as Router, Link, Route,Switch} from 'react-router-dom';

export default function LoginHome(){
    return(
        <Router>
            <Switch>
                <Route path='/admin'>
                    <Admin/>
                </Route>
                <Route path='/'>
                    <User/>
                </Route>
            </Switch>
        </Router>
    )
}
function Admin(){
    return 
}
function User(){
    return
}