import React from "react";
import {Link} from "react-router-dom";
import './Card.css'
import {TextField} from "@material-ui/core";
import axios from "axios";


export default function Card({product}) {
    const {id, image, name, price} = product;
    const [quantity, setQuantity] = React.useState("");
    const username = localStorage.getItem('username');

    function addToCart() {
        if (window.localStorage.length === 0) {
            alert("Please Login");
        } else {
            const data = {
                "Id": product.id,
                "Quantity": quantity,
                "Username": username,
            };
            if (quantity > 0) {
                axios.post("http://simondu-ubuntu.uials.no:8080/api/addToCart", data)
                    .then(() => {
                        alert("Product is added to cart")
                    })
            } else {
                alert("Quantity must be more than 0")
                setQuantity(1);
            }

        }
    }



    return (
        <div>
            <Link to={`/details/${id}`}>
                <div className="card" style={{width: "25rem", margin: 20}}>
                    <img className="card-img-top" style={{height: 350}} src={image} alt="Product Image"/>
                    <div>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text text-bold">
                            <b>{price},- kr</b>
                        </p>
                    </div>
                </div>
            </Link>
            <form>
                <div className="formControl">
                    <TextField onChange={(e) => {
                        setQuantity(e.target.value)
                    }}
                               value={quantity}
                               type = "number"
                               className="input"
                               label="Quantity"
                               required
                               variant="outlined"
                    />
                </div>
                <button type="button" onClick={() => addToCart()}>Add To Cart</button>
            </form>
        </div>
    );
}
