import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import"../../components/Admin/Admin.css";
import {Button, TextareaAutosize, TextField} from "@material-ui/core";
import axios from "axios";
import validator from 'validator';

export default function NewProduct() {

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [valid, setValid] = useState(false);
    const history = useHistory();

    function handleSubmit() {
            if(productName.length !== 0 || description.length !== 0 || productPrice.length !== 0) {
                if (valid === true) {
                axios('http://simondu-ubuntu.uials.no:8080/api/newProduct', {
                    method: "POST",
                    data: {
                        "productName": productName,
                        "description": description,
                        "image#": image,
                        "productPrice": productPrice,

                    }
                }).then(() => {
                    history.push("/AllProducts")
                }).catch(function (error) {
                    alert("ERROR", error.message)
                })
            }
        } else {
            alert("Please enter valid details")

        }

    }

    function validate(value) {
        if (validator.isURL(value)) {
            setValid(true);

        } else {
            if (value.length === 0) {
                setErrorMessage("");
            } else {
                setErrorMessage("Enter valid URL")
            }

        }
    }

    return (
        <div className="body">
            <div className="form">
            <form className="SubmitForm">
                <h1>Add new product</h1>
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
                               type="number"
                               label="Price"
                               required
                               variant="outlined"
                    />
                </div>
                <div className="formControl">

                    <TextField value={image}
                               onChange={(e) => setImage(e.target.value)}
                               onChangeCapture={(e) => validate(e.target.value)}
                               variant="outlined"
                               type="url"
                               label="Image"
                               required
                               className="input"
                    />
                    <div>
                        <span>{errorMessage}</span>
                    </div>
                </div>

                <div>
                    <label>
                        Description
                    </label><br/>
                    <TextareaAutosize type="text"
                                      className="textArea"
                                      onChange={(e) => setDescription(e.target.value)}
                                      rowsMin="8"
                                      cols="40"
                                      required
                                      value={description}
                    />
                </div>


                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
            </div>
        </div>
    );
}