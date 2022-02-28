import React, {useState} from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import {
    Button,
    IconButton,
    InputAdornment,
    TextField
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import './Login.css'
import axios from 'axios';


export default function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState({
        password: "",
        showPassword: false,
    });
    const [address, setAddress] = React.useState("");
    const [tlf, setTlf] = React.useState("");

    const handleClickShowPassword = () => {
        setPassword({...password, showPassword: !password.showPassword});
    };

    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
    });

    React.useEffect(() => {
        setAppState({ loading: true });
        let url = 'http://localhost:8080/login';
        axios(url,{
            method: 'POST',
            data: {
                "username":'s'
            },
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => console.log(res))
        ;
    }, [setAppState]);


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
                        className = "input"
                        variant="outlined"
                        type={password.showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}

                                    >
                                        {password.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <PasswordStrengthBar password = {password} className = "strength-bar"/>
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
                <TextField  onChange={e => {
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
                    <Button className="button" variant="contained" color="primary" type="button">Submit</Button>
                </div>
            </form>
        </div>
    );
}