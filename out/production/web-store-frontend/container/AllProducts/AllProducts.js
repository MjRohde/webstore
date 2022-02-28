import React from "react";
import Card from "../../components/UI/Card/Card";
import ProductList from "../data/ProductList.json"
import './AllProducts.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

//Gathered inspiration from https://github.com/NTNU-SysDev/react-demo-shop-with-api/blob/master/webapp/src/pages/Home/Home.js
export default function AllProducts() {
    const [data, setData] = React.useState([]);

    const dataList = ProductList.data;

    function loadData() {
        fetch("http://localhost:8080/" + "/AllProducts", {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            setData(json);
        }).catch(function (err) {
            alert("ERROR:" + err);
        });
    }

    React.useEffect(() => {
        loadData();
    }, []);

    function handleDelete(id) {
        fetch('http://localhost:8080/' + `/product/${id}`, {
            method: "DELETE"
        }).then(function () {
            loadData();
        }).catch(function (error) {
            alert("ERROR:" + error);
        });
    }

    return (

        <div
            className="container"
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 40
            }}
        >
            <Sidebar/>
            {dataList.map(function (item) {
                return <Card key={item.id} product={item} handleDelete={handleDelete}/>;
            })}
            <Footer />
        </div>
    );
}