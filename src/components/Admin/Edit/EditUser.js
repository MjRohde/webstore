import React from "react";
import axios from "axios";
import {TextField} from "@material-ui/core";
import {useHistory} from "react-router";
import "../Admin.css";


export default function EditUser() {
    const user = localStorage.getItem("user");

    const [username, setUsername] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [tlf, setTlf] = React.useState("");
    const [admin, setAdmin] = React.useState("");
    let history = useHistory();

    function getUser() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/getUser", user).then(response => {
            setUsername(response.data[0].username);
            setAddress(response.data[0].address);
            setTlf(response.data[0].tlf);
            setAdmin(response.data[0].admin);
            localStorage.removeItem("user");
        });
    }

    React.useEffect(() => getUser(), []);

    const newData = {
        "Username": username,
        "Address": address,
        "tlf": tlf,
        "admin": admin
    };

    function updateUser() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/updateUser", newData)
            .then(() => {
                    history.push("/AdminUserTable")
                }
            ).catch(error => {
            alert("ERROR: " + error);
        })
    }


    return (
        <div className="edit-body">
            <div className="form">
                <h1>Edit {username}</h1>
                <form>
                    <div className="formControl">
                        <TextField onChange={e => {
                            setAddress(e.target.value)
                        }}
                                   value={address}
                                   className="input"
                                   label="Address"
                                   required
                                   variant="outlined"

                        />
                    </div>
                    <div className="formControl">
                        <TextField onChange={e => {
                            setTlf(e.target.value)
                        }}
                                   value={tlf}
                                   className="input"
                                   label="Phone number"
                                   type="number"
                                   variant="outlined"
                                   required
                        />
                    </div>
                    <div className="formControl">
                        <TextField onChange={(e) => {
                            setAdmin(e.target.value)
                        }}
                                   type="number"
                                   value={admin}
                                   className="input"
                                   label="AdminUserTable 1 or 0"
                                   variant="outlined"
                        />
                    </div>
                    <div>
                        <button type="button" onClick={() => updateUser()}>Submit changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}