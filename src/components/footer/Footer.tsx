'use client';

import {Footer as FlowbiteFooter} from 'flowbite-react';
import {BsFacebook, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs';

export default function Footer() {
    return (
        <FlowbiteFooter container className="mt-4">
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1  md:container mx-auto">
                    <div>
                        <FlowbiteFooter.Brand
                            alt="AllNewsy logo"
                            href="/"
                            name="AllNewsy"
                            src="/logo.svg"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FlowbiteFooter.Title title="about"/>
                            <FlowbiteFooter.LinkGroup col>
                                <FlowbiteFooter.Link href="#">
                                    AllNewsy
                                </FlowbiteFooter.Link>
                                <FlowbiteFooter.Link href="#">
                                    Contact Us
                                </FlowbiteFooter.Link>
                            </FlowbiteFooter.LinkGroup>
                        </div>
                        <div>
                            <FlowbiteFooter.Title title="Legal"/>
                            <FlowbiteFooter.LinkGroup col>
                                <FlowbiteFooter.Link href="#">
                                    Privacy Policy
                                </FlowbiteFooter.Link>
                                <FlowbiteFooter.Link href="#">
                                    Terms & Conditions
                                </FlowbiteFooter.Link>
                            </FlowbiteFooter.LinkGroup>
                        </div>
                    </div>
                </div>
                <FlowbiteFooter.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FlowbiteFooter.Copyright
                        by="AllNewsy™"
                        href="#"
                        year={2023}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FlowbiteFooter.Icon
                            href="#"
                            icon={BsFacebook}
                        />
                        <FlowbiteFooter.Icon
                            href="#"
                            icon={BsInstagram}
                        />
                        <FlowbiteFooter.Icon
                            href="#"
                            icon={BsTwitter}
                        />
                        <FlowbiteFooter.Icon
                            href="#"
                            icon={BsGithub}
                        />
                    </div>
                </div>
            </div>
        </FlowbiteFooter>
    )
}


