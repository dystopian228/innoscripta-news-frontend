import React from "react";
import {useSelector} from "react-redux";
import { selectUser} from "../redux/slices/auth.slice";
import {Navigate, Outlet} from "react-router-dom";
import AppNavbar from "../components/nav/AppNavbar";
import Footer from "../components/footer/Footer";

const ProtectedWrapper: React.FC<{ withFooter: boolean }> = ({withFooter}) => {

    const user = useSelector(selectUser);

    if (!user) {
        return <Navigate to='/auth/login'/>;
    }
    return (
        <div className="flex flex-col w-full h-full">
            <AppNavbar/>
            <Outlet/>
            {withFooter && <Footer/>}
        </div>
    )
};

export default ProtectedWrapper;