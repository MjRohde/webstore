import React from "react";
import axios from "axios";
import { IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import PasswordStrengthBar from "react-password-strength-bar";
import { useHistory} from "react-router";

export default function ChangePassword() {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const history = useHistory();

    const data = {
        "username": localStorage.getItem("username"),
        "Password": password,
    };

    const handleClickShowPassword = () => {
        setPassword({...password, showPassword: !password.showPassword});
    };

    function changePassword() {
        axios.post("http://simondu-ubuntu.uials.no:8080/api/changePassword", data).then( () => {
            history.push("/MyPage");
        });
    }

    function checkPasswords() {
        return (password !== confirmPassword) || (password.length < 1 || confirmPassword.length < 1);
    }

    return (
        <div>
            <form>
                <div className="formControl">
                    <TextField
                        label='Password'
                        variant="outlined"
                        className="input"
                        type={password.showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}>
                                        {password.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <PasswordStrengthBar className="password" password={password}/>
                </div>
                <div className="formControl">
                    <TextField
                        label='Confirm Password'
                        variant="outlined"
                        className="input"
                        type={password.showPassword ? "text" : "password"}
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                            checkPasswords()
                        }}
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
                <div>
                    <button disabled={checkPasswords()} onClick={() => changePassword()} type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}