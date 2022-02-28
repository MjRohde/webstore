import React, {useEffect} from "react";
import UserItem from "./UserItem.js";
import axios from "axios";
import HelpIcon from '@material-ui/icons/Help';
import "./Admin.css";
import {useHistory} from "react-router";

import {Tooltip} from "@material-ui/core";

export default function AdminUserTable() {
    const [data, setData] = React.useState([]);
    let username = localStorage.getItem('username');
    const history = useHistory();

    function checkAdmin() {
        if (localStorage.length === 0) {
            history.push("/log-in")
        }

        if (localStorage.length === 1) {
            axios.post("http://simondu-ubuntu.uials.no:8080/api/getUser", username).then(response => {
                if (response.data[0].admin === 0) {
                    history.push("/MyPage")
                }
            })
        }
    }


    function getUsers() {
        axios.get("http://simondu-ubuntu.uials.no:8080/api/allUsers")
            .then(res => {
                setData(res.data)
            })
    }

    useEffect(() => {
        getUsers();
        checkAdmin();
    }, []);


    return (
        <div className="body-users">
            <Tooltip
                title="By selecting the users a delete and edit button will appear. The deletion is done by one click. The edit button will
                take you to another page.">
                <HelpIcon className="Announce" fontSize="large"/>
            </Tooltip>
            <table>
                <tbody className="table-danger">
                <tr>
                    <td>Username</td>
                    <td>Address</td>
                    <td>Telephone</td>
                    <td>Admin</td>
                    <td>Delete</td>
                </tr>
                </tbody>
                {data.map(function (item) {
                    return <UserItem user={item}/>
                })}
            </table>
        </div>

    );
}


