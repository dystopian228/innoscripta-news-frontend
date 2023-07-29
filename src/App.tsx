import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import Loader from "./components/common/Loader";
import router from "./router/Router";

const App: React.FC = () => {

    return (
        <div className="App">
            <Loader/>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
