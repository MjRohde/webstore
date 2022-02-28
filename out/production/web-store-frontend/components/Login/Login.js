import React from 'react';
import {Link} from "react-router-dom";
import "./Login.css";
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";


export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState({
            password: "",
            showPassword: false,
        }
    );
    const handleClickShowPassword = () => {
        setPassword({...password, showPassword: !password.showPassword});
    };

    function sendLogin() {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({username, password})
        }
        return (
            fetch('http://localhost:8080', requestOptions)
                .then(handleResponse)
                .then(user => {
                    if (user) {
                        user.authdata = window.btoa(username + ':' + password);
                    }
                    return user;
                }).catch(function (error) {
                alert("ERROR:", error)
            }));
    }

    function handleResponse(response) {
        return (response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        }))
    }


    return (
        <div className="login-wrapper">
            <h1>Log in</h1>
            <form className="submitForm">
                <div className="formControl">
                    <TextField onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                               value={username}
                               className="input"
                               label="Email"
                               required
                               variant="outlined"
                    />
                </div>
                <div className="formControl">
                    <TextField
                        label='Password'
                        variant="outlined"
                        className="input"
                        required
                        type={password.showPassword ? "text" : "password"} //
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
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
                </div>
                <div className="formControl">
                    <Button variant="contained" color="primary" type="button"
                            onClick={() => sendLogin()}>Submit</Button>
                </div>
                <div className="formControl">
                    <Link to="/registerUser" className="btn">
                        Register new User
                    </Link>
                </div>
            </form>
        </div>
    );
}