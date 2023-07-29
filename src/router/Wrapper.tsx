import React from "react";
import AppNavbar from "../components/nav/AppNavbar";
import {Outlet} from "react-router-dom";
import Footer from "../components/footer/Footer";

const Wrapper: React.FC<{ withFooter: boolean }> = ({withFooter}) => {
    return (
        <div className="flex flex-col w-full h-full">
            <AppNavbar/>
            <Outlet/>
            {withFooter && <Footer/>}
        </div>
    )
};

export default Wrapper;