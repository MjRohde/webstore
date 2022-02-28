import React from "react";
import {Link} from "react-router-dom";
import './CartStyles.css'
import ProductList from '../../container/data/ProductList.json';

const Cart = () => {

    return (
        <div>
            <div className="CartItem">
                <ul>
                    <li>
                        <p>A nice pair of jeans</p>
                        <img src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa9%2Fb6%2Fa9b637ca9026aec3559f49fc3b430abac3ed696f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_jeans_slim%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"/>
                    </li>

                </ul>
                <ul>
                    <li id="Price"><b>Price: </b>2000 kr</li>
                </ul>
            </div>
            <div className="Summary">
                <p><b>Total price</b></p>
                <button className="btn btn-info">Pay With Vipps</button>
            </div>
        </div>
    );
};

export default Cart;