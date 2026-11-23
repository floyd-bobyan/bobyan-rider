"use client"

import Image from "next/image"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import styles from "./styles.module.scss"
import loginpic from "../../../assets/login.png"
import { loginUser } from "../../../lib/slices/login";
import { redirect } from "next/navigation";
import uris from "../../../utils/uris";

const LoginMain = () => {
    const [riderId, setRiderId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const dispatch = useDispatch();
    const { loading, success: loginSuccess, data: loginData, error: loginError } = useSelector((state) => state.login);

    const handleInputChange = (e) => {
        if (e.target.name === "password") setPassword(e.target.value)
        if (e.target.name === "riderId") setRiderId(e.target.value)
        setErrors("");
    }

    const handleLogin = () => {
        dispatch(loginUser({ id: riderId, password }))
    }

    useEffect(() => {
        setErrors(loginError);
    }, [loginError]);

    useEffect(() => {
        if (loginSuccess && loginData) {
            redirect(uris.performance);
        }
    }, [ loginSuccess, loginData]);    

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
                                name="riderId"
                                type="number"
                                placeholder="Enter your Civil ID number"
                                value={riderId}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => handleInputChange(e)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleLogin();
                                    }
                                }}
                            />
                        </div>
                        <div className={styles["login-button"]} onClick={handleLogin}>
                            {loading ? "Logging in..." : "Login"}
                        </div>
                        <div className={styles["error-message"]}>
                            {loginError && <span className={styles["error-message"]}>{errors}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginMain