import React from "react";
import './Loader.css';
import {useSelector} from "react-redux";
import {selectGlobalLoading} from "../../redux/slices/root.slice";

export const BlipCircle: React.FC<{colored?: boolean, center?: boolean}> = ({colored}) => {
    return <div className="spinner absolute left-0 right-0">
        <div className={`double-bounce1 ${colored ? 'primary' : ''}`}></div>
        <div className={`double-bounce2 ${colored ? 'primary' : ''}`}></div>
    </div>;
};

const Loader: React.FC = () => {

    const globalLoading = useSelector(selectGlobalLoading);

    return <div className={`bg-primary fixed z-20 w-full h-full loader-container ${!globalLoading ? 'active' : ''}`}>
        <div className="z-50 w-auto h-5 relative mx-auto my-2 top-[72px] bg-no-repeat bg-center"
             style={{backgroundImage: "url('/logo_inverse.svg')"}}/>
        <BlipCircle/>
    </div>;
};

export default Loader;