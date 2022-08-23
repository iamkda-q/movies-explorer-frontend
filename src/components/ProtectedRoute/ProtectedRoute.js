import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    return (
        <Route path={props.path} exact>
            {props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />}
        </Route>
    );
}

export default ProtectedRoute;
