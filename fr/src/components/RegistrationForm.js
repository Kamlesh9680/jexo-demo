import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../components/Innerpages.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    verificationCode: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    acceptPolicy: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [codeSent, setCodeSent] = useState(false);  // Track if code is sent
  const [isSending, setIsSending] = useState(false);  // Track if code is being sent
  const [serverVerificationCode, setServerVerificationCode] = useState(''); // Store the verification code sent by server
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const sendVerificationCode = async () => {
    if (!formData.email) {
      alert('Please enter your email first.');
      return;
    }

    setIsSending(true);  // Set loading state to true

    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-verification', {
        email: formData.email,
      });

      // If the request is successful and user does not exist
      setCodeSent(true);
      setServerVerificationCode(String(response.data.verificationCode));
    } catch (err) {
      // Handle error responses
      if (err.response && err.response.data) {
        if (err.response.data.msg === 'User already exists') {
          alert('A user with this email already exists. Please try a different email.');
        } else {
          alert(err.response.data.msg);
        }
      } else {
        alert('Error sending verification code. Please try again.');
      }
    } finally {
      setIsSending(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Log the type and value of the verification code
    console.log('Type of serverVerificationCode:', typeof serverVerificationCode);
    console.log('Value of serverVerificationCode:', serverVerificationCode);

    // Basic validation: Ensure all necessary fields are filled
    if (!formData.username || !formData.email || !formData.verificationCode || !formData.mobile || !formData.password || !formData.confirmPassword || !formData.acceptPolicy) {
      setError('Please fill out all required fields.');
      return;
    }

    // Passwords match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Ensure the user accepted the policy
    if (!formData.acceptPolicy) {
      setError('You must accept the User Agreement and Privacy Policy.');
      return;
    }

    // Check if the verification code matches (trimmed)
    if (formData.verificationCode.trim() !== serverVerificationCode.trim()) {
      setError('The verification code does not match.');
      return;
    }

    try {
      // Make a POST request to your backend API (authController.js) to register the user
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);

      // Handle success (receive JWT token from backend)
      const { token } = response.data;

      // Store token in localStorage (or sessionStorage)
      localStorage.setItem('token', token);

      // Set success message and redirect to home page
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/');  // Redirect to the homepage after success
      }, 2000);

    } catch (err) {
      // Handle errors from the server
      if (err.response && err.response.data) {
        setError(err.response.data.msg);
      } else {
        setError('Server error. Please try again.');
      }
    }
  };


  return (
    <div className="page-wrapper">
      <div className="page-container2">
        <div className="header-fix">
          <i className="ri-arrow-left-line"></i>
          <h2>Jexo</h2>
        </div>

        <div className="regis-logo">
          <img src="/nike.jpeg" alt="Nike Logo" />
        </div>

        <div className="user-register-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="input"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Enter Username"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <div className="vcode-container">
                <input
                  type="text"
                  className="vcode-input"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  placeholder="Enter verification code"
                  maxLength="6"
                />
                <button
                  type="button"
                  className={`send-btn ${codeSent ? 'sent' : ''}`} // Add 'sent' class if codeSent is true
                  onClick={sendVerificationCode}
                  disabled={codeSent || isSending} // Disable if code is sent or sending
                  style={{ color: codeSent ? 'green' : 'blue' }}  // Change text color based on codeSent state
                >
                  {isSending ? 'Sending...' : codeSent ? 'Code Sent' : 'Send Code'} {/* Handle button text based on state */}
                </button>
              </div>
            </div>

            <div className="form-group">
              <input
                type="tel"
                className="input"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                placeholder="Enter mobile number"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter login password"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm login password"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="input"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleInputChange}
                placeholder="Invitation Code"
              />
            </div>

            <div className="form-group check-agree">
              <label>
                <input
                  type="checkbox"
                  name="acceptPolicy"
                  checked={formData.acceptPolicy}
                  onChange={handleInputChange}
                  required
                />
                I have read and agree to
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  User Agreement
                </a> and
                <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>.
              </label>
            </div>
            {error && <div className="error c-white">{error}</div>}
            {success && <div className="success c-white">{success}</div>}

            <div className="form-group">
              <button type="submit" className="submit-btn">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
