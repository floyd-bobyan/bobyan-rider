"use client"

import Image from "next/image"

import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import loginpic from "../../../assets/login.png"
import styles from "./styles.module.scss"
import { loginUser } from "../../../lib/slices/login";

const LoginMain = () => {
    const [riderId, setRiderId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const dispatch = useDispatch();
    const { loading, success: loginSuccess, data: loginData, error: loginError } = useSelector((state) => state.login);

    const handleLogin = () => {
        // Handle login logic here
        console.log("Username:", riderId);
        console.log("Password:", password);

        dispatch(loginUser({id: riderId, password}))
    }

    return (
        <div className={styles["login-page"]}>
            <div className={styles["login-page-container"]}>
                <div className={styles["image-container"]}>
                    <Image
                        src={loginpic}
                        alt="Bobyan Riders Login"
                        className={styles["login-image"]}
                    />
                </div>

                <div className={styles["login-form-container"]}>
                    <div className={styles["header"]}>BOBYAN DELIVERY</div>
                    <div className={styles["sub-text"]}>Welcome, please login to your account</div>
                    <div className={styles["form-container"]}>
                        <div className={styles["input-wrapper"]}>
                            <label>Civil ID</label>
                            <input
                                type="number"
                                placeholder="Enter your Civil ID number"
                                value={riderId}
                                onChange={(e) => setRiderId(e.target.value)}
                            />
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles["login-button"]} onClick={handleLogin}>
                            {loading ? "Logging in..." : "Login"}
                        </div>
                        <div className={styles["error-message"]}>
                            {loginError && <span>{loginError}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginMain