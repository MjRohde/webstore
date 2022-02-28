import React from "react";
import "./Admin.css";
import {useHistory} from "react-router";
import {Button, Checkbox} from "@material-ui/core";
import axios from "axios";

export default function ProductItem({product}) {
    const {name, desc, price, image} = product;
    const [hide, setHide] = React.useState(false);
    const history = useHistory();

    const toggleHide = () => {
        setHide((oldState) => !oldState);

    };

    function deleteProduct(name) {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/deleteProduct", name).then(() => window.location.reload());
    }


    return (
        <tbody>
        <tr>
            <td>
                <Checkbox
                    className="checkbox"
                    onClick={toggleHide}
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
                {name}</td>
            <td>{desc}</td>
            <td>{price}</td>
            <td><img src={image} alt="Product image" className="AdminImg"/></td>
            <td>
                {
                    hide &&
                    <Button className="button" onClick={() => deleteProduct(name)}>Delete</Button>
                }
                {
                    hide &&
                    <Button className="button" onClick={() => {
                        history.push("/editProduct");
                        localStorage.setItem('prodId', product.id)
                    }}>Edit</Button>
                }

            </td>
        </tr>
        </tbody>
    );
}