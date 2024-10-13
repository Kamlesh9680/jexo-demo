import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Innerpages.css';

function LoginForm() {
  const [loginType, setLoginType] = useState('username');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const switchLogin = (type) => {
    setLoginType(type);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginType === 'email' ? formData.email : '',
        username: loginType === 'username' ? formData.username : '',
        password: formData.password,
      });

      const { token, user, membership } = response.data;

      // Store user, membership info, and token in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('membership', JSON.stringify(membership));

      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.msg);
      } else {
        setError('Error logging in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-container2">
        <div className="header-fix">
          <i className="ri-arrow-left-line"></i>
          <h2>Jexo</h2>
        </div>

        <div className="regis-logo login-logo">
          <img src="/nike.jpeg" alt="Nike logo" />
        </div>

        <div className="user-register-form user-login">
          <form onSubmit={handleSubmit}>
            

            {/* Login Toggle */}
            <div className="form-group">
              <div className="login-toggle">
                <span
                  id="username-toggle"
                  className={loginType === 'username' ? 'active' : ''}
                  onClick={() => switchLogin('username')}
                >
                  Username login
                </span>
                <span
                  id="email-toggle"
                  className={loginType === 'email' ? 'active' : ''}
                  onClick={() => switchLogin('email')}
                >
                  Email login
                </span>
              </div>
            </div>

            {/* Username login field */}
            {loginType === 'username' && (
              <div className="form-group" id="username-login">
                <input
                  type="text"
                  className="input"
                  name="username"
                  required
                  placeholder="Enter Username"
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Email login field */}
            {loginType === 'email' && (
              <div className="form-group" id="email-login">
                <input
                  type="email"
                  className="input"
                  name="email"
                  required
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="password"
                className="input"
                name="password"
                required
                placeholder="Enter login password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group spce-btwn">
              <a href="#" className="c-white">Forgot Password</a>
              <a href="/register">Register</a>
            </div>

            <div className="form-group check-agree">
              <label>
                <input type="checkbox" name="acceptpolicy" id="acceptpolicy" required />
                I have read and agree to
                <a href="/privacy-policy" target="_blank">User Agreement</a> and
                <a href="/terms-of-service" target="_blank">Privacy Policy</a>.
              </label>
            </div>

            {/* Display error message */}
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              {/* Update button text based on loading state */}
              <input
                type="submit"
                value={loading ? 'Logging in...' : 'Login'} 
                className="submit-btn"
                disabled={loading} 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
