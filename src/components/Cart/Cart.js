import React from "react";
import './Cart.css'
import axios from "axios";
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router";

const Cart = () => {
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState([]);
    const username = localStorage.getItem('username');
    const history = useHistory();

    function loadData() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/getCart", username)
            .then(response => {
                if(response.data.length === 0)
                {
                    alert("Cart is empty")
                    history.push("/AllProducts")
                }
                else {
                setData(response.data);
                setTotal(response.data[0].total)
                }
            }).catch(error => {
            alert("ERROR" + error);
        });
    }

    React.useEffect(() => {
        loadData();
    }, []);


    function deleteFromCart(id) {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/deleteFromCart", id).then(loadData())
            .catch(error => {
                alert("ERROR" + error);
            });
    }

    return (
        <div>
            {data.map(function (item) {
                return (
                    <div className="CartItem">
                        <ul>
                            <li>
                                <p>{item.product.name}</p>
                                <img src={item.product.image}/>
                            </li>
                        </ul>
                        <ul>
                            <li id="Price"><b>Quantity: </b>{item.quantity} stk</li>
                        </ul>
                        <ul>
                            <li id="Price"><b>Price: </b>{item.product.price} kr</li>
                        </ul>
                        <ul>
                            <li>
                                <button onClick={() => deleteFromCart(item.id)}>Delete</button>
                            </li>
                        </ul>
                    </div>
                )
            })}
            <div className="Summary">
                <p><b>Total price: {total} kr </b></p>
                <NavLink to="/Payment">
                    <button className="btn btn-info">Checkout</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Cart;