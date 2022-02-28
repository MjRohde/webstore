import React, {useState} from 'react';
import './OrderConfirmed.css'
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm'
import {useHistory} from "react-router";

const OrderConfirmed = props => {
    const [cart, setCart] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const username = localStorage.getItem('username');
    const history = useHistory();


    function loadData() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/getCart", username)
            .then(response => {
                setCart(response.data);
            }).catch(error => {
            alert("ERROR" + error);
        });
        axios.post('http://simondu-ubuntu.uials.no:8080/api/getOrder', username)
            .then(response => {
                setOrder(response.data[0]);
            }).catch(error => {
            alert("ERROR" + error)

        });
    }

    React.useEffect(() => {
        loadData();
    }, []);

    function reset(){
        history.push("/AllProducts")
    }

    return (
        <div className="containerOrder">
            <div className="order">
                <h1>Order Details</h1>
                <div className="AppWrapper">
                        <div>
                            <p>Order Number: {order.id}</p>
                            <p>Username: {order.username}</p>
                            <p>Total: {order.total}</p>
                        </div>
                </div>
                <h1>Products</h1>
                {cart.map(function (item) {
                    return (
                        <div className="CartItem">
                            <ul>
                                <li>
                                    <p><strong>Name:</strong></p>
                                    <p>{item.product.name}</p>
                                    <img src={item.product.image} alt="Product Image"/>
                                </li>
                            </ul>
                            <ul>
                                <p><strong>Quantity:</strong></p>
                                <li id="Price">{item.quantity} stk</li>
                            </ul>
                            <ul>
                                <p><strong>Price:</strong></p>
                                <li id="Price">{item.product.price} kr</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
            <button type="button" onClick={() => reset()}>Back to store</button>
        </div>
    );
};
export default OrderConfirmed
