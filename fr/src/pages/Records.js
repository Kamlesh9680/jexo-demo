import React from 'react';
import '../components/Records.css'; // Import your CSS file
import Navbar from '../components/BottomNav';
const Records = () => {
  return (
    <div className="page-wrapper">
      <div className="page-container2">
        <div className="header-fix">
          <i className="ri-arrow-left-line"></i>
          <h2>Record</h2>
        </div>
        <div className="no-data-wrapper">
          <div className="no-data">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="150"
              viewBox="0 0 256 256"
            >
              <g
                fill="#c4c4c4"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: 'normal' }}
              >
                <g transform="scale(4,4)">
                  <path d="M24,2.88867c-11.63429,0 -21.11133,9.47705 -21.11133,21.11133c0,11.63428 9.47704,21.11133 21.11133,21.11133c5.03655,0 9.6647,-1.77999 13.29883,-4.73828l14.83203,18.58008c0,0 3.24862,0.48286 5.26563,-1.61914c2.031,-2.118 1.55469,-5.19922 1.55469,-5.19922l-18.57812,-14.83594c2.95829,-3.63413 4.73828,-8.26228 4.73828,-13.29883c0,-11.63428 -9.47704,-21.11133 -21.11133,-21.11133zM24,7.11133c9.35255,0 16.88867,7.53613 16.88867,16.88867c0,9.35254 -7.53612,16.88867 -16.88867,16.88867c-9.35255,0 -16.88867,-7.53613 -16.88867,-16.88867c0,-9.35254 7.53612,-16.88867 16.88867,-16.88867z"></path>
                </g>
              </g>
            </svg>
            <p>No data yet</p>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Records;
