import React, {useEffect} from "react";
import axios from "axios";
import "./Admin.css"
import {useHistory} from "react-router";
import ProductItem from "./ProductItem";
import HelpIcon from "@material-ui/icons/Help";
import {Tooltip} from "@material-ui/core";

export default function AdminProductsTable() {
    const [data, setData] = React.useState([]);
    let username = localStorage.getItem('username');
    const history = useHistory();

    function getProducts() {
        axios.get("http://simondu-ubuntu.uials.no:8080/api/allProducts").then(response =>
            setData(response.data));
    }

    function checkAdmin() {
        if (localStorage.length === 0) {
            history.push("/log-in")
        }

        if (localStorage.length === 1) {
            axios.post("http://simondu-ubuntu.uials.no:8080/api/getUser", username).then(response => {
                if (response.data.admin === 0) {
                    history.push("/MyPage")
                }
            })
        }
    }


    useEffect(() => {
        getProducts();
        checkAdmin();
    }, []);

    return (
        <div className="body">
            <Tooltip
                title="By selecting the products a delete and edit button will appear. The deletion is done by one click. The edit button will
                take you to another page.">
                <HelpIcon className="Announce" fontSize="large"/>
            </Tooltip>
            <table>
                <tbody className="table-danger">
                <tr>
                    <td>ProductName</td>
                    <td>ProductCategory</td>
                    <td>Price</td>
                    <td>Image</td>
                    <td>Delete/Edit</td>
                </tr>
                </tbody>
                {data.map(function (item) {
                    return <ProductItem product={item}/>
                })}
            </table>
        </div>

    );
}