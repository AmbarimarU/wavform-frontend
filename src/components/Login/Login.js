import React, { useState, useEffect } from "react";
import { loginUsers } from "../Api/Api";
import { jwtDecode } from "jwt-decode";
import useAuthHooks from "../Hooks/Auth/useAuthHooks";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setUsername] = useState("");
    const [, , checkToken] = useAuthHooks();

    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (checkToken()) {
                navigate("/get-all-users");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Authentication failed: Invalid credentials");
            } else {
                console.error("An error occurred:", error);
            }
        }
    }, [checkToken, navigate]);

    async function handleOnSubmit(e) {
        e.preventDefault();
        try {
            let result = await loginUsers({
                email,
                password,
                username,
            });
            if (result.data.token.error) {
                return alert(result.data.token.error);
            } else {
                const jwtToken = result.data.token;
                //console.log(jwtToken);
                window.localStorage.setItem("jwtToken", jwtToken);
                const decodedToken = jwtDecode(jwtToken);
                //console.log(decodedToken);

                setUser({
                    email: decodedToken.email,
                    username: decodedToken.username,
                    id: decodedToken.id,
                });
                navigate("/");
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className="login">
            <div className="login__container">
                <h2 className="login__title">Log in</h2>

                <form onSubmit={handleOnSubmit} className="login__form">
                    <div className="form-container">
                        <div className="form-field">
                            <input
                                className="form-input"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-container">
                        <div className="form-field">
                            <input
                                className="form-input"
                                type={
                                    process.env.NODE_ENV === "production"
                                        ? "password"
                                        : "text"
                                }
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-container">
                        <div className="form-field">
                            <input
                                className="form-input"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <button className="login-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
