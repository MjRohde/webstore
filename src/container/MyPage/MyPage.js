import React from "react";
import axios from "axios";
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";


export default function MyPage() {
    const data = localStorage.getItem('username');

    const [username, setUsername] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [tlf, setTlf] = React.useState("");
    const [admin, setAdmin] = React.useState(0);
    const [isAdmin, setIsAdmin] = React.useState(false);
    let history = useHistory();

    function getUser() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/getUser", data).then(response => {
            setUsername(response.data[0].username);
            setAddress(response.data[0].address);
            setTlf(response.data[0].tlf);
            setAdmin(response.data[0].admin)
            if (admin === 1) {
                setIsAdmin(true);
            }
        });
    }

    React.useEffect(() => getUser(), [])

    const newData = {
        "Username": username,
        "Address": address,
        "tlf": tlf,
        "admin": admin,
    };

    function updateUser() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/updateUser", newData).then(response => {
            alert(response.data);
        }).catch(error => {
            alert("ERROR: " + error);
        })
    }


    function logOut() {
        localStorage.clear();
        history.push("/AllProducts");
        window.location.reload();
    }

    function deleteUser() {
        axios.post('http://simondu-ubuntu.uials.no:8080/api/deleteUser', newData)
            .then(() => {
                localStorage.clear()
                history.push("/AllProducts")
                window.location.reload()
            }
        )
    }

    return (
        <div>
            <h1>Your Page</h1>
            <button onClick={() => logOut()}>Log Out</button>
            {
                isAdmin &&
                <button className="btn btn-danger" onClick={() => history.push("/AdminUserTable")}>Enter admin mode</button>
            }
            <form onSubmit={() => updateUser()}>
                <div className="formControl">
                    <TextField onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                               value={username}
                               className="input"
                               label="Email"
                               variant="outlined"
                               InputProps={{readOnly: true,}}
                    />
                </div>
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
                <div>
                    <button type="submit">Submit changes</button>
                    <NavLink to="/ChangePassword"><button> Change Password</button></NavLink>
                    <button onClick={() => deleteUser()}>Delete Account</button>
                </div>
            </form>
        </div>
    );
}