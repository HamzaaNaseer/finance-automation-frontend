import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";


//Outlet means the inner component
const DonorProtection = () => {

    const loading = false;
    const isAuthenticated = localStorage.getItem("access-token-fyp") ? true : false
    const user = JSON.parse(localStorage.getItem("user-data"))

    return (


        <Fragment>
            {isAuthenticated && user.role !== "DONER" ? <Outlet /> : <Navigate to="/login" />}
        </Fragment>

    )

};

export default DonorProtection;