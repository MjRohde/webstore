import React, {useState} from 'react';
import './payment.css'
import axios from "axios";
import  { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm'

const promise = loadStripe("pk_test_51ImFZXHkW9KG4E1ZOSm6aGcae1NjKH86m9mvKU73i3xAqlxNF1YHCqNoBg7tYOquMQYLxpqWvjVsTHlyJsR36Hf300KZbrKBsO");

const Payment = props => {
    const [cart, setCart] = React.useState([]);
    const [total, setTotal] = React.useState([]);
    const username = localStorage.getItem('username');


    function loadData() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/getCart", username)
            .then(response => {
                setCart(response.data);
                setTotal(response.data[0].total)
            }).catch(error => {
            alert("ERROR" + error);
        });
    }

    React.useEffect(() => {
        loadData();
    }, []);



    return (
        <div className="containerPayment">
            <div className="payment">
                <h1>Payment Details</h1>
                <div className="AppWrapper">
                <Elements stripe={promise}>
                    <CheckoutForm data={total} />
                </Elements>
            </div>
            </div>
            <div className="sidebar">
                <h1>Summary</h1>
                {cart.map(function (item) {
                    return(
                        <div className="CartItem">
                            <ul>
                                <li>
                                    <p>{item.product.name}</p>
                                    <img src={item.product.image} alt="Product Image"/>
                                </li>
                            </ul>
                            <ul>
                                <li id="Price">{item.quantity} stk</li>
                            </ul>
                            <ul>
                                <li id="Price">{item.product.price} kr</li>
                            </ul>
                        </div>
                    )})}

                <div className="Summary">
                    <p><b>Total price: {total} kr </b></p>
                </div>
            </div>
        </div>
    );
};

export default Payment;
