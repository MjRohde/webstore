import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import "./Login.css";
import {
    IconButton,
    InputAdornment,
    TextField,
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState({
            password: "",
            showPassword: false,
        }
    );

    let history = useHistory();

    useEffect(() => {
        if (localStorage.length !== 0) {
            history.push("/MyPage")
        }
    });

    const handleClickShowPassword = () => {
        setPassword({...password, showPassword: !password.showPassword});
    };

    function sendLogin() {
        const requestOptions = {
            method: "POST",
            data: {
                "Username": username,
                "Password": password,
            }
        };
        return (
            axios('http://simondu-ubuntu.uials.no:8080/api/login', requestOptions)
                .then(response => {
                    if (response.data[0].username === username) {
                        if (response.data[0].admin === 1) {
                            history.push("/AdminUserTable");
                        } else {
                            history.push("/AllProducts");
                        }
                        localStorage.setItem('username', username);
                    } else {
                        alert("Please register");
                    }
                    window.location.reload();
                })
                .catch(function (error) {
                    alert("ERROR:", error.message);
                }));
    }


    return (
        <div className="login-wrapper">
            <h1>Log in</h1>
            <form>
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
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}

                                >
                                    {password.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </div>
                <button type="button" onClick={() => sendLogin()}>Log in</button>
                <br/>
                <Link to="/registerUser" className="linkRegister">
                    Register new User
                </Link>
            </form>
        </div>
    );
}