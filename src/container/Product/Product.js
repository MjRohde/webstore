import React, {useEffect} from 'react';
import axios from "axios";
import './Product.css';
import Footer from "../../components/Footer/Footer";
import {TextField} from "@material-ui/core";


export default function Post(props) {
    const [product, setProduct] = React.useState({});
    const [quantity, setQuantity] = React.useState("");
    const username = localStorage.getItem('username');

    function loadData(id) {
        axios.get("http://simondu-ubuntu.uials.no:8080/api/details/" + id)
            .then(response => {
                setProduct(response.data[0])
            })
    }

    useEffect(() => {
        const productID = props.match.params.id;
        loadData(productID);
    }, []);

    function addToCart() {
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

    return (
        <div className="full">
            <div className="card-body">
                    <img className="img-product" src={product.image} alt="Image"/><br/>
                <div className="ProdDescription">
                    <h4 className="title">
                        Description
                    </h4>
                    <p className="text-body">{product.desc}</p>

                </div>
            </div>
            <div className="container-container">
                <div className="container">
                    <h1 className="title">{product.name}</h1>
                    <h3>{product.price} -,kr</h3>
                    <form>
                        <div className="formControl">
                            <TextField onChange={(e) => {
                                setQuantity(e.target.value)
                            }}
                                       value={quantity}
                                       className="input"
                                       label="Quantity"
                                       required
                                       variant="outlined"
                            />
                        </div>
                        <button type="button" className="btn btn-info" onClick={()=> addToCart(product)}>Add To Cart</button>
                    </form>
                </div>
            </div>
        </div>

    )
}