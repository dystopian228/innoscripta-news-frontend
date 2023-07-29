import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import React from "react";
import Wrapper from "./Wrapper";
import NewsFeed from "../components/feed/NewsFeed";
import Login from "../pages/auth/Login";
import GuestWrapper from "./GuestRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Wrapper withFooter={true}/>,
        children: [
            {
                path: "/",
                element: <Home/>,

            },
            {
                path: "/:category",
                element: <div className="md:container  md:mx-auto"><NewsFeed/></div>,
            }
        ]
    },
    {
        path: "/user",
        element: <GuestWrapper/>,
        children: [
            {
                path: "/user/signup",
                element: <Signup/>,

            },
            {
                path: "/user/login",
                element: <Login/>,
            }
        ]
    },
]);

export default router;