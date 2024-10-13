import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../components/VIPPlans.css';
import Navbar from '../components/BottomNav';

const VIPPlans = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [selectedPlan, setSelectedPlan] = useState(null); // State to track selected VIP plan

  // Function to go back
  const goBack = () => {
    navigate(-1); 
  };

  const handleSelectPlan = async (vip) => {
    try {
      const response = await fetch('/api/purchase-vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: '12345', vipLevel: vip.level, price: vip.price })
      });

      const result = await response.json();

      if (result.success) {
        // Polling for payment confirmation
        const checkPayment = setInterval(async () => {
          const paymentStatus = await fetch(`/api/check-payment-status/${result.transactionId}`);
          const paymentResult = await paymentStatus.json();

          if (paymentResult.success && paymentResult.status === 'success') {
            clearInterval(checkPayment);
            alert(`VIP Plan ${vip.level} successfully purchased!`);
          }
        }, 5000); // Check every 5 seconds
      } else {
        alert('Error initiating payment.');
      }
    } catch (error) {
      console.error('Error purchasing VIP plan:', error);
      alert('An error occurred. Please try again.');
    }
  };


  return (
    <div className="page-wrapper">
      <div className="page-container2">
        <div className="header-fix">
          <i className="ri-arrow-left-line" onClick={goBack}></i>
          <h2> Member Center</h2>
        </div>
        <div className="earning-boxes-wrapper">
          <h3>
            Current Level: <i className="ri-gift-2-fill"></i>
          </h3>
          <div className="earning-boxes">
            <div className="earning-box">
              <h6>0</h6>
              <p>Total Earning (USDT)</p>
            </div>
            <div className="earning-box">
              <h6>0</h6>
              <p>Cumulative Earning (USDT)</p>
            </div>
          </div>
        </div>
        <div className="membership-wrapper">
          <h2 className="mheading">Special Package</h2>
          <div className="team-members-wrapper">
            {[
              { level: 'VIP1', views: 4, time: 66, income: 0.3, price: 50 },
              { level: 'VIP2', views: 10, time: 66, income: 0.6, price: 200 },
              { level: 'VIP3', views: 20, time: 66, income: 0.8, price: 500 },
              { level: 'VIP4', views: 25, time: 66, income: 1.4, price: 1000 },
              { level: 'VIP5', views: 30, time: 66, income: 3.8, price: 3000 },
              { level: 'VIP6', views: 40, time: 66, income: 5.8, price: 6000 },
              { level: 'VIP7', views: 50, time: 66, income: 7.8, price: 8000 },
            ].map((vip, index) => (
              <div className="team-member-boxes" key={index}>
                <h6>{vip.level}</h6>
                <div className="team-member-box">
                  <div className="member-box">
                    <h5>{vip.views} View</h5>
                    <p>Daily Per View</p>
                  </div>
                  <div className="member-box">
                    <h5>{vip.time}</h5>
                    <p>Valid Time</p>
                  </div>
                  <div className="member-box">
                    <h5 className="gr-txt">
                      {vip.income} <span>USDT</span>
                    </h5>
                    <p>Per View Income</p>
                  </div>
                </div>
                <div className="team-list-btn-wrapper">
                  <button onClick={() => handleSelectPlan(vip)}>{vip.price} USDT Unlock Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default VIPPlans;
