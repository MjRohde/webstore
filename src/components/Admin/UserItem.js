import * as React from "react";
import "./Admin.css";
import Checkbox from '@material-ui/core/Checkbox';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router";
import axios from "axios";

export default function UserItem({user}) {
    const {username, address, tlf, admin} = user;
    const [hide, setHide] = React.useState(false);
    const history = useHistory();

    function deleteUser() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/deleteUser", {"Username":username})
            .then( () => {
            window.location.reload()
        });
    }


    const toggleHide = () => {
        setHide((oldState) => !oldState);

    };


    return (
        <tbody>
        <tr>
            <td><Checkbox
                className="checkbox"
                onClick={toggleHide}
                inputProps={{'aria-label': 'primary checkbox'}}
            />{username}</td>
            <td>{address}</td>
            <td>{tlf}</td>
            <td>{admin}</td>
            <td>
                {
                    hide &&
                    <Button className="button" onClick={() => deleteUser()}>Delete</Button>

                }
                {
                    hide &&
                    <Button className="button" onClick={() => {
                        history.push("/editUser");
                        localStorage.setItem('user', username)
                    }}>Edit</Button>
                }

            </td>
        </tr>
        </tbody>
    );
}
