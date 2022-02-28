import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import {HashRouter, Route} from 'react-router-dom';
import NewProduct from "./container/NewProduct/NewProduct";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import AllProducts from "./container/AllProducts/AllProducts";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage/HomePage";
import Post from "./container/Product/Product";
import MyPage from "./container/MyPage/MyPage";
import AdminUserTable from "./components/Admin/AdminUserTable";
import Payment from './container/Payment/payment'
import AdminProductsTable from "./components/Admin/AdminProductsTable";
import {Logo} from "./components/Logo/Logo";
import ChangePassword from "./container/MyPage/ChangePassword";
import EditUser from "./components/Admin/Edit/EditUser";
import EditProducts from "./components/Admin/Edit/EditProducts";
import OrderConfirmed from "./container/Payment/OrderConfirmed";
import {Switch} from "react-router-dom";

function App() {



    return (
        <HashRouter>
            <div className="App">
                <Header/>
                <Logo />
                <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/NewProduct" component={NewProduct}/>
                <Route path="/log-in" component={Login}/>
                <Route path="/registerUser" component={Register}/>
                <Route path="/AllProducts" component={AllProducts}/>
                <Route path="/Cart" component={Cart} />
                <Route path="/details/:id" component={Post}/>
                <Route path="/AdminUserTable" component={AdminUserTable}/>
                <Route path="/adminProducts" component={AdminProductsTable}/>
                <Route path="/myPage" component={MyPage}/>
                <Route path="/Payment" component={Payment}/>
                <Route path="/orderConfirmed" component={OrderConfirmed}/>
                <Route path="/ChangePassword" component={ChangePassword}/>
                <Route path="/editUser" component={EditUser}/>
                <Route path="/editProduct" component={EditProducts}/>
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
