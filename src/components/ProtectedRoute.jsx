import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";


//Outlet means the inner component
const ProtectedRoute = () => {
    
    const loading = false;
    const isAuthenticated = localStorage.getItem("access-token-fyp") ? true : false
    return (
        !loading &&

        <Fragment>
            {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
        </Fragment>

    )

};

export default ProtectedRoute;