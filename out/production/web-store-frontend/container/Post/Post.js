import React, {useEffect} from 'react';
import Card from "../../components/UI/Card/Card";
import ProductList from '../data/ProductList.json'
import axios from "axios";

export default function Post() {
        const [product, setProduct] = React.useState({
            id: "",
            productCategory: "",
            productName: "",
            productPrice: "",
            description: "",
            image: "",

        });

        async function fetchData() {
            const res = await axios("http://localhost:8080/product");
            res
                .json()

        }


        return product ? (
            <div className="container">
                <h1 className="title">{product.productName}</h1>
                <img className="card-img" src = {product.image}/>
                <p className="text-body">{product.description}</p>
            </div>
        ):null
}