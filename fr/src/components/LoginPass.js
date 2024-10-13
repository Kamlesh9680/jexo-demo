import React from 'react';
import '../components/Innerpages.css'; // Import your custom styles
import { useNavigate } from "react-router-dom";

const LoginPassword = () => {
    const navigate = useNavigate(); // Hook for navigation


    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="page-wrapper">
            <div className="page-container2">
                <div className="header-fix">
                    <i className="ri-arrow-left-line" onClick={goBack}></i>
                    <h2>Login Password</h2>
                </div>

                <div className="login-password-wrapper">
                    <div className="login-pass-input">
                        <label htmlFor="usermail">Email address</label>
                        <input
                            type="email"
                            name="usermail"
                            id="usermail"
                            className="input"
                            defaultValue="onlinenogmail.com"
                        />
                    </div>

                    <div className="login-pass-input">
                        <label htmlFor="vcode">Verification code</label>
                        <div className="vcode-container">
                            <input
                                type="text"
                                className="vcode-input"
                                placeholder="Enter verification code"
                                maxLength="6"
                            />
                            <button className="send-btn">Send</button>
                        </div>
                    </div>

                    <div id="passwordForm" className="login-pass-input">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            className="input mb-15"
                            id="password"
                            placeholder="6-20 alphanumeric password"
                            required
                        />
                        <input
                            type="password"
                            className="input"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>


                    <div className="ok-btn">
                        <button>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPassword;
