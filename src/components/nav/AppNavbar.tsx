import {Avatar, Button, type CustomFlowbiteTheme, Dropdown, Navbar} from 'flowbite-react';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    changeGlobalLoading, fetchCategories,
    selectCategories,
    selectStatus
} from "../../redux/slices/root.slice";
import {ApiResponseEnum} from "../../api/types/responses/api.response.enum";
import axios from "axios";
import {capitalizeWord} from "../../util/common";
import {selectCategory} from "../../redux/slices/news.slice";
import {Link} from "react-router-dom";
import {selectUser, signOutUser} from "../../redux/slices/auth.slice";

const customLinkTheme: CustomFlowbiteTheme['navbar'] = {
    link: {
        base: "block py-2 pr-4 pl-3 md:p-0",
        active: {
            on: "bg-transparent text-secondary font-bold border-b border-secondary",
            off: "bg-transparent text-accent"
        }
    }
};

const customButtonTheme: CustomFlowbiteTheme['button'] = {
    "color": {
        "secondary": "focus:outline-none text-white bg-secondary-700 border border-transparent enabled:hover:bg-secondary-800 focus:ring-secondary-300 dark:bg-secondary-600 dark:enabled:hover:bg-secondary-700 dark:focus:ring-secondary-800 rounded-lg focus:ring-2",
        "accent": "focus:outline-none text-white bg-accent-700 border border-transparent enabled:hover:bg-accent-800 focus:ring-accent-300 dark:bg-accent-600 dark:enabled:hover:bg-accent-700 dark:focus:ring-accent-800 rounded-lg focus:ring-2",
    },
}
const AppNavBar: React.FC = () => {

    const dispatch = useDispatch();
    const categories: string[] = useSelector(selectCategories);
    const requestStatus: ApiResponseEnum = useSelector(selectStatus);
    const selectedCategory: string | null = useSelector(selectCategory);
    const user = useSelector(selectUser);
    const cancelToken = axios.CancelToken;
    const tokenSource = cancelToken.source();

    useEffect(() => {


        if (requestStatus === ApiResponseEnum.IDLE) {

            dispatch(changeGlobalLoading(true));
            // @ts-ignore
            dispatch(fetchCategories(tokenSource));
        }

        return () => {
            tokenSource.cancel();
        };
    }, []);

    return (
        <Navbar
            fluid
            className="sticky top-0 bg-primary mt-0 z-10"
        >
            <Navbar.Brand href="/">
                <img
                    alt="AllNewsy"
                    className="mr-3 h-4 sm:h-6"
                    src="/logo_inverse.svg"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        </span>
            </Navbar.Brand>
            <div className="flex gap-2 md:order-2">
                {!user ? <>
                        <Link to='/auth/login'><Button color="secondary" theme={customButtonTheme}>
                            Login
                        </Button>
                        </Link>
                        <Link to="/auth/signup"><Button color="secondary" theme={customButtonTheme}>
                            Sign up
                        </Button>
                        </Link>
                    </> :
                    <>
                        <Dropdown
                            inline
                            label={<Avatar alt="User settings"
                                           img={`https://ui-avatars.com/api/?name=${user.name}`} rounded/>}
                        >
                            <Dropdown.Header>
                    <span className="block text-sm">
                    {user.name}
                    </span>
                                        <span className="block truncate text-sm font-medium">
                    {user.email}
                    </span>
                            </Dropdown.Header>
                            <Link to='/user/preferences'>
                                <Dropdown.Item>
                                    Preferences
                                </Dropdown.Item>
                            </Link>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={() => {
                                // @ts-ignore
                                dispatch(signOutUser({tokenSource}));
                            }}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    </>}
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Link to='/'>
                    <Navbar.Link
                        active={selectedCategory === null}
                        theme={customLinkTheme.link}
                    >
                        <p>
                            Home
                        </p>
                    </Navbar.Link>
                </Link>
                {categories.slice(0,6).map(category =>
                    <Link to={`/${category}`} key={category}>
                        <Navbar.Link theme={customLinkTheme.link}
                                     active={selectedCategory === category}>
                            {capitalizeWord(category)}
                        </Navbar.Link>
                    </Link>)
                }
                <Link to='/search'>
                    <Navbar.Link
                        theme={customLinkTheme.link}
                    >
                        <p>
                            Search
                        </p>
                    </Navbar.Link>
                </Link>
            </Navbar.Collapse>
        </Navbar>)
};

export default AppNavBar;