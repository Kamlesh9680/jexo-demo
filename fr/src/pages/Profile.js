import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Profile.css';
import Navbar from '../components/BottomNav';

const Profile = () => {
  const [memberPoint, setMemberPoint] = useState(0); 
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const userId = userData.id;

  useEffect(() => {
    const fetchMemberPoint = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ratingincome/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch member points');
        }
        const data = await response.json();
        setMemberPoint(data.ratingIncome);
        console.log(memberPoint); // Update state with fetched member point
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemberPoint(); // Call the fetch function
  }, [userId]);

  // Logout function
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?'); // Confirmation dialog
    if (confirmed) {
      localStorage.removeItem('user'); // Remove user data from localStorage
      navigate('/login'); // Redirect to login page after logout
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-container2 profilepage">
        <div className="settings-wrapper">
          <div className="st-top-bar">
            <div className="st-left">
              <div className="logo">
                <img src="/nike.jpeg" alt="Nike Logo" />
              </div>
              <div className="user-details">
                <h4>username</h4>
                <p>ID: 1756984</p>
              </div>
            </div>
            <div className="st-right">
              <div className="user-season">
                <img src="/season.png" alt="Season" />
                <p>S0</p>
              </div>
              <button>City Partner</button>
            </div>
          </div>

          <div className="st-user-details">
            <div className="st-ud-inner">
              <h6>0</h6>
              <p>Recharge and Withdraw</p>
            </div>
            <div className="st-ud-inner">
              <h6>0</h6>
              <p>Decay Reward</p>
            </div>
            <div className="st-ud-inner">
              <h6>{memberPoint.toFixed(2)}</h6>
              <p>Member Point</p>
            </div>
          </div>

          <div className="settings">
            <div className="settings-wrapper-inner">
              <Link to="https://jexo.vip" className="setting-box">
                <div className="setting-icon"><i className="ri-global-line"></i></div>
                <p>Official Link</p>
              </Link>
              <Link to="/user-kyc" className="setting-box">
                <div className="setting-icon"><i className="ri-id-card-line"></i></div>
                <p>User KYC</p>
              </Link>
              <Link to="/invite-friend" className="setting-box">
                <div className="setting-icon"><i className="ri-share-line"></i></div>
                <p>Invite Friend</p>
              </Link>
              <Link to="/login-password" className="setting-box">
                <div className="setting-icon"><i className="ri-lock-line"></i></div>
                <p>Login Password</p>
              </Link>
              <Link to="/transaction-password" className="setting-box">
                <div className="setting-icon"><i className="ri-shield-check-line"></i></div>
                <p>Transaction Password</p>
              </Link>
              <Link to="/notification" className="setting-box">
                <div className="setting-icon"><i className="ri-notification-2-line"></i></div>
                <p>Notification</p>
              </Link>
              <Link to="/customer-service" className="setting-box">
                <div className="setting-icon"><i className="ri-customer-service-2-line"></i></div>
                <p>Customer Service</p>
              </Link>
            </div>
            <div className="logout-btn">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
