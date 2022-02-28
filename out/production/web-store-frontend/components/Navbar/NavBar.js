import React from 'react';
import './NavBarStyles.css';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const NavBar = () => {

    return (
        <div className="navBar">
            <ul>
                <li><NavLink to="/NewProduct">New Product</NavLink></li>
                <li><NavLink to="/AllProducts">Products</NavLink></li>
            </ul>
            <ul>
                <li className="floatRight"><NavLink to="/Cart"><ShoppingCartIcon/></NavLink>
                </li>
                <li className="floatRight"><NavLink to="/log-in">Log in</NavLink></li>
            </ul>
        </div>
    );
};
export default NavBar;
