import React, {useEffect, useState} from 'react';
import {
    IconButton,
    InputAdornment,
    TextField
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import axios from 'axios';
import PasswordStrengthBar from "react-password-strength-bar";
import {useHistory} from "react-router";

export default function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState({
        password: "",
        showPassword: false,
    });
    const [address, setAddress] = React.useState("");
    const [tlf, setTlf] = React.useState("");
    const history = useHistory();

    const handleClickShowPassword = () => {
        setPassword({...password, showPassword: !password.showPassword});
    };

    useEffect(() => {
        if (localStorage.length !== 0) {
            history.push("/MyPage")
        }
    });


    function sendRegistration() {
        const requestOptions = {
            method: "POST",
            data: {
                "Username": username,
                "Password": password,
                "Address": address,
                "tlf": tlf,
            }
        };
        return (
            axios('http://simondu-ubuntu.uials.no:8080/api/registerUser', requestOptions)
                .then(response => {
                    alert(response.data);
                    history.push("/log-in")
                })
                .catch(function (error) {
                    alert("ERROR : " + error);
                }));
    }

    return (
        <div className="login-wrapper">
            <h1>Register</h1>
            <form>
                <div className="formControl">
                    <TextField onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                               value={username}
                               className="input"
                               label="Email"
                               type="email"
                               required
                               variant="outlined"
                    />
                </div>
                <div className="formControl">
                    <TextField
                        label='Password'
                        variant="outlined"
                        className="input"
                        type={password.showPassword ? "text" : "password"} // <-- This is where the magic happens
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}

                                    >
                                        {password.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <PasswordStrengthBar className="password" password={password}/>
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
                    <button type="button" onClick={() => sendRegistration()}>Submit</button>
                </div>
            </form>
        </div>
    );
}