import {createBrowserRouter} from "react-router-dom";
import Home from "../components/Home";
import Signup from "../components/auth/Signup";
import React from "react";
import Wrapper from "./Wrapper";
import NewsFeed from "../components/feed/NewsFeed";
import Login from "../components/auth/Login";
import GuestWrapper from "./GuestRoute";
import ProtectedWrapper from "./ProtectedRoute";
import Preferences from "../components/preferences/Preferences";

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
        element: <ProtectedWrapper withFooter/>,
        children: [
            {
                path: "/user/preferences",
                element: <Preferences/>,

            }
        ]
    },
    {
        path: "/auth",
        element: <GuestWrapper/>,
        children: [
            {
                path: "/auth/signup",
                element: <Signup/>,

            },
            {
                path: "/auth/login",
                element: <Login/>,
            }
        ]
    },
]);

export default router;