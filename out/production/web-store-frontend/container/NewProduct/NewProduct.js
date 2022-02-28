import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import "./NewProductStyles.css";
import {Button, TextareaAutosize, TextField} from "@material-ui/core";
import axios from "axios";




export default function NewProduct() {

    const [productCategory, setProductCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();

    const history = useHistory();

    function handleSubmit() {
        //const newId = blogPosts[blogPosts.length - 1].id + 1;
        const newId = 4;
        const newProduct = {
            id: newId,
            productCategory: productCategory,
            productName: productName,
            productPrice: productPrice,
            description: description,
            image: image,
        };

        axios('http://localhost:8080', {
            method: "POST",
            body: JSON.stringify(newProduct)
        }).then(function () {
            history.push("/")
        }).catch(function (error) {
            alert("ERROR", error)
        })
    }

    return (
        <div>
            <form className="SubmitForm">
                <h1>Add new product</h1>
                <div className="formControl">
                    <TextField onChange={(e) => {
                        setProductCategory(e.target.value)
                    }}
                               value={productCategory}
                               className="input"
                               label="Category"
                               required
                               variant="outlined"
                    />
                </div>

                <div className="formControl">
                    <TextField onChange={(e) => {
                        setProductName(e.target.value)
                    }}
                               value={productName}
                               className="input"
                               label="Name"
                               required
                               variant="outlined"
                    />
                </div>

                <div className="formControl">
                    <TextField onChange={(e) => {
                        setProductPrice(e.target.value)
                    }}
                               value={productPrice}
                               className="input"
                               type = "number"
                               label="Price"
                               required
                               variant="outlined"
                    />
                </div>
                <div className="formControl">

                    <TextField value={image}
                               onChange={(e) => setImage(e.target.value)}
                               variant="outlined"
                               type = "text"
                               label = "Image"
                               required
                               className="input"
                    />
                </div>

                <div>
                    <label>
                        Description
                    </label><br/>
                    <TextareaAutosize type = "text"
                                      onChange={(e) => setDescription(e.target.value)}
                                      rowsMin="8"
                                      cols="40"
                    />
                </div>


                <Button type="button" color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    );
}