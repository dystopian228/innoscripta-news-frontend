import React from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/slices/auth.slice";
import {Navigate, Outlet} from "react-router-dom";
import AppNavbar from "../components/nav/AppNavbar";

const GuestWrapper: React.FC = () => {

    const user = useSelector(selectUser);

    if (user) {
        return <Navigate to='/'/>;
    }
    return (
        <div className="flex flex-col w-full h-full">
            <AppNavbar/>
            <Outlet/>
        </div>
    )
};

export default GuestWrapper;