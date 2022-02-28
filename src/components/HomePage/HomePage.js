import React, {useEffect} from "react";
import "./HomePage.css"
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";
import {useHistory} from "react-router";
import Login from "../Login/Login";


export default function HomePage() {
    const [hide, setHide] = React.useState(false);
    const history = useHistory();

    const toggleHide = () => {
        setHide((oldState) => !oldState);

    };

    useEffect(() => {
        if (localStorage.length === 0) {
            toggleHide();

        }
    }, [])

    return (
        <div className="main">
            <Link to="/details/5">
                <div className="com">
                    <div className="info">
                        <h2>3 for 2</h2>
                        <p><b>Nimble made shirts</b></p>
                        <p><b>1299,- kr</b></p>
                        <button className="btn btn-primary">Shop Now</button>
                    </div>
                </div>
            </Link>
            <div className="login">
                <div className="login-form">
                    {
                        hide &&
                        <h1>What a beautiful day to</h1>
                    }
                    {
                        hide &&
                        <Login/>

                    }
                </div>
                {
                    !hide &&
                    <div className="register">
                        <div className="enjoy">
                            <h1>“The Best Way To Get Started Is To Quit Talking And Begin Doing.” – Walt Disney</h1>
                        </div>

                    </div>
                }
            </div>
            <div className="news-container">
                <div className="news">
                    <img className="card-img-top"
                         src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80"
                         alt="Newly added"/>
                    <h3>Booty shorts</h3>
                    <button className="btn btn-primary" onClick={() => history.push("/details/2")}>Shop now</button>
                </div>
                <div className="news">
                    <img className="card-img-top"
                         src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                         alt="Newly added 2"/>
                    <h3>Nike shoes</h3>
                    <button className="btn btn-primary" onClick={() => history.push("/details/3")}>Shop now</button>
                </div>
                <div className="news">
                    <img className="card-img-top"
                         src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3450&q=80"
                         alt="Newly added 2"/>
                    <h3>Fossil Watch</h3>
                    <button className="btn btn-primary" onClick={() => history.push("/details/4")}>Shop now</button>
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
};