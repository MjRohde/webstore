import React from "react";
import Card from "../../components/Card/Card";
import './AllProducts.css'
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";


//Gathered inspiration from https://github.com/NTNU-SysDev/react-demo-shop-with-api/blob/master/webapp/src/pages/Home/Home.js
export default function AllProducts() {
    const [data, setData] = React.useState([]);
    const [search, setSearch] = React.useState("#");
    const [anchorEl, setAnchorEl] = React.useState(null);

    function loadData() {
        axios.get("http://simondu-ubuntu.uials.no:8080/api/allProducts").then(response => {
            setData(response.data);
        }).catch(error => {
            alert("ERROR" + error);
        });
    }

    function searchForProducts(search) {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/search", search).then(response => {
            setData(response.data);
        }).catch(error => {
            alert("ERROR" + error);
        });
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function sortHigh() {
        data.sort((a, b) => a.price < b.price ? 1 : -1);
    }

    function sortLow() {
        data.sort((a, b) => a.price > b.price ? 1 : -1);
    }

    React.useEffect(() => {
        loadData();
    }, []);


    return (
        <div className="main-wrapper">
            <div
                className="containers"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 40
                }}>
                <SearchBar className="searchBar" onChange={(e) => {
                    if (e.valueOf().length === 0) {
                        setSearch("#")
                    } else {
                        setSearch(e.valueOf());
                    }
                }} onRequestSearch={() => searchForProducts(search)}/> <br/>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Sort by price
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={e => {
                        handleClose();
                        sortHigh()
                    }}>High to Low</MenuItem>
                    <MenuItem onClick={e => {
                        handleClose();
                        sortLow()
                    }}>Low to High</MenuItem>
                </Menu>

                {data.map(function (item) {
                    return <Card key={item.id} product={item}/>;
                })}

            </div>
            <div className="footer-footer">
                <Footer/>
            </div>

        </div>

    );
}