import React from "react";
import {Link} from "react-router-dom";
import './CardStyles.css'

export default function Card({product, handleDelete}) {
    const {id, productName, productPrice, image} = product;

    function addToCart() {

    }

    return (
        <Link to={`/details/${id}`}>
        <div className="card" style={{width: "18rem", margin: 20}}>
            <img  className="card-img-top" style={{height: 200}} src={image} alt="Product Image"/>
            <div>
                <h5 className="card-title">{productName}</h5>
                <p className="card-text text-bold">
                    <b>{productPrice},- kr</b>
                </p>
                <button onClick={() => addToCart()}>Add to Cart</button>
            </div>
        </div>
        </Link>
    );
}
