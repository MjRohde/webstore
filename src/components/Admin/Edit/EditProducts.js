import React, {useEffect} from "react";
import axios from "axios";
import {TextareaAutosize, TextField} from "@material-ui/core";
import "../Admin.css";
import {useHistory} from "react-router"


export default function EditProducts() {
    const prodId = localStorage.getItem("prodId");
    const history = useHistory();
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");

    function getProduct() {
        axios.get("http://simondu-ubuntu.uials.no:8080/api/details/" + prodId).then(response => {
            setId(response.data[0].id);
            setName(response.data[0].name);
            setDescription(response.data[0].desc);
            setImage(response.data[0].image);
            setPrice(response.data[0].price);
            localStorage.removeItem("prodId");
        });
    }


    useEffect(() => {
        getProduct();
    }, []);

    const newData = {
        "id": id,
        "name": name,
        "desc": description,
        "image": image,
        "price": price,
    };

    function updateProduct() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/updateProduct", newData).then(
            () => {
                history.push("/adminProducts")
            }
        ).catch(error => {
            alert("ERROR: " + error);
        })
    }


    return (
        <div className="body">
            <div className="form">
                <h1>Edit Product</h1>
                <form onSubmit={() => updateProduct()}>
                    <div className="formControl">
                        <TextField onChange={(e) => {
                            setName(e.target.value)
                        }}
                                   value={name}
                                   className="input"
                                   label="Product Name"
                                   variant="outlined"
                                   required
                        />
                    </div>

                    <div className="formControl">
                        <TextField onChange={e => {
                            setImage(e.target.value)
                        }}
                                   value={image}
                                   className="input"
                                   label="Image Link"
                                   required
                                   variant="outlined"

                        />

                    </div>
                    <div className="formControl">
                        <TextField onChange={e => {
                            setPrice(e.target.value)
                        }}
                                   value={price}
                                   className="input"
                                   label="Price"
                                   type="number"
                                   variant="outlined"
                                   required
                        />
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
                                          value={description}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}