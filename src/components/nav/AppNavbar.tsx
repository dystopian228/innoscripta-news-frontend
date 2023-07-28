import {Avatar, type CustomFlowbiteTheme, Dropdown, Navbar} from 'flowbite-react';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    changeGlobalLoading, fetchCategories,
    selectCategories,
    selectStatus
} from "../../redux/slices/root.slice";
import {ApiResponseEnum} from "../../api/api.response.enum";
import axios from "axios";
import {capitalizeWord} from "../../util/common";
import {selectCategory} from "../../redux/slices/news.slice";
import {Link} from "react-router-dom";

const customLinkTheme: CustomFlowbiteTheme['navbar'] = {
    link: {
        base: "block py-2 pr-4 pl-3 md:p-0",
        active: {
            on: "bg-transparent text-secondary font-bold border-b border-secondary",
            off: "bg-transparent text-accent"
        }
    }
};
const AppNavBar: React.FC = () => {

    const dispatch = useDispatch();
    const categories: string[] = useSelector(selectCategories);
    const requestStatus: ApiResponseEnum = useSelector(selectStatus);
    const selectedCategory: string | null = useSelector(selectCategory);

    useEffect(() => {

        const cancelToken = axios.CancelToken;
        const tokenSource = cancelToken.source();

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
            className="sticky top-0 bg-primary mt-0"
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
            <div className="flex md:order-2">
                <Dropdown
                    inline
                    label={<Avatar alt="User settings"
                                   img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
                >
                    <Dropdown.Header>
            <span className="block text-sm">
              Bonnie Green
            </span>
                        <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Preferences
                    </Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
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
                {categories.map(category =>
                    <Link to={category}>
                        <Navbar.Link theme={customLinkTheme.link}
                                     key={category}
                                     active={selectedCategory === category}>
                            {capitalizeWord(category)}
                        </Navbar.Link>
                    </Link>)
                }
            </Navbar.Collapse>
        </Navbar>)
};

export default AppNavBar;