import React from "react";
import './App.css';
import Hero from "./components/Hero/Hero";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NewProduct from "./container/NewProduct/NewProduct";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import AllProducts from "./container/AllProducts/AllProducts";
import Cart from "./components/Cart/Cart";

function App() {

    return (
        <Router>
            <div className="App">
                <Hero/>
                <Route exact-path="/" component={Home}/>
                <Route path="/NewProduct" component={NewProduct}/>
                <Route path="/log-in" component={Login}/>
                <Route path="/registerUser" component={Register}/>
                <Route path="/AllProducts" component={AllProducts}/>
                <Route path="/Cart" component={Cart} />
            </div>
        </Router>

    );
}

export default App;
