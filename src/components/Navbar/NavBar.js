import React from 'react';
import './NavBar.css';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";

const NavBar = () => {
    let username = localStorage.getItem('username');
    const [admin, setAdmin] = React.useState("");

    if (localStorage.length === 1) {
        axios.post('http://simondu-ubuntu.uials.no:8080/api/getUser', username)
            .then(response => {
                console.log(response)
                setAdmin(response.data[0].admin)
            });
        if (admin === 1) {
            return (
                <div className="navBar">
                    <ul>
                        <li><NavLink to="/AllProducts">Products</NavLink></li>
                        <li><NavLink to="/adminProducts">ProductsList (admin)</NavLink></li>
                        <li><NavLink to="/AdminUserTable">Users (admin)</NavLink></li>
                        <li><NavLink to="NewProduct">New Product(admin)</NavLink></li>
                    </ul>
                    <ul>
                        <li className="floatRight"><NavLink to='/myPage'>{username}</NavLink></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="navBar">
                    <ul>
                        <li><NavLink to="/AllProducts">Products</NavLink></li>
                    </ul>
                    <ul>
                        <li className="floatRight"><NavLink to="/Cart"><ShoppingCartIcon/></NavLink></li>
                        <li className="floatRight"><NavLink to='/myPage'>{username}</NavLink></li>
                    </ul>
                </div>
            )
        }
    } else {
        return (
            <div className="navBar">
                <ul>
                    <li><NavLink to="/AllProducts">Products</NavLink></li>
                </ul>
                <ul>
                    <li className="floatRight"><NavLink to="/log-in">Log in</NavLink></li>
                </ul>
            </div>
        );
    }
};
export default NavBar;
