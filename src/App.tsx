import React from 'react';
import './App.css';
import AppNavbar from "./components/nav/AppNavbar";
import Home from "./pages/Home";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import NewsFeed from "./components/feed/NewsFeed";
import Loader from "./components/common/Loader";


const NavbarWrapper = () => {
    return (
        <div>
            <AppNavbar/>
            <Outlet/>
        </div>
    )
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarWrapper/>,
        children: [
            {
                path: "/",
                element: <Home/>,

            },
            {
                path: "/:category",
                element: <div className="md:container  md:mx-auto"><NewsFeed/></div>,
            },
        ]
    },
]);

const App: React.FC = () => {

    return (
        <div className="App">
            <Loader/>

            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
