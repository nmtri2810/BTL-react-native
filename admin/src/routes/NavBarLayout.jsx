import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../components/UI/NavBar";

const NavBarLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default NavBarLayout;
