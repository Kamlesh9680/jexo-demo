import React from 'react';
import '../components/Innerpages.css'; // Import your custom styles
import { useNavigate } from "react-router-dom";

const TradePassword = () => {
  const navigate = useNavigate(); // Hook for navigation


  const goBack = () => {
      navigate(-1); 
    };
  return (
    <div className="page-wrapper">
      <div className="page-container2">
        {/* Header */}
        <div className="header-fix">
          <i className="ri-arrow-left-line" onClick={goBack}></i>
          <h2>Login Password</h2>
        </div>

        {/* Login Password Section */}
        <div className="login-password-wrapper">
          {/* Email Input */}
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

          {/* Verification Code Input */}
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

          {/* Password Input */}
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

          {/* Notice Section */}
          <div className="notice-wrapper">
            <h4>Warm reminder:</h4>
            <ul>
              <li>
                Your fund password is used for transactions, withdrawals and
                account security settings. It is recommended not to be the same
                as your login password. This site is not responsible for any
                account theft resulting from this.
              </li>
              <li>After modifying the fund password, you cannot withdraw within 24 hours.</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="ok-btn">
            <button>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePassword;
