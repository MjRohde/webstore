import React, {useState, useEffect} from 'react';
import './ProductStyles.css';
import Card from "../UI/Card/Card";
import axios from "axios";

const Product = (props) => {
    const [product, setPost] = useState({
        id: "",
        productCategory: "",
        productName: "",
        productPrice: "",
        description: "",
        image: "",
        maxQuantity: ""
    });
    useEffect(() => {
        const productId = props.match.params.postId;
        const post = JSON.parse(localStorage.getItem('Blog ' + productId));
        setPost(post);
    });

    if (product.id === "") return null;

    return (
        <div className="container">
            <Card style={{width: '100%'}}>
                <div className="blogHeader">
                    <h1 className="post-title">{product.productName}</h1>
                </div>
                <div className="postImageContainer">
                    <img src={(`${product.blogImage}`)} alt="Blog resource"/>
                </div>
                <div className="postContent">
                    <p>{product.blogText}</p>
                </div>
            </Card>
        </div>
    );
};

export default Product;