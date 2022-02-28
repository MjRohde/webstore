import logo from "../../images/Logo.png"
import React from "react";
import "./Logo.css";
import {Link} from "react-router-dom";

export const Logo = () => {
    return (
        <div>
            <Link to="/">
                <img src={logo} className="Logo" alt="logo"/>
            </Link>
        </div>
    );
};