import React from "react";
import '../components/Team.css';
import Navbar from '../components/BottomNav';
function Team() {
    return (
        <div className="page-wrapper">
            <div className="page-container2">
                <div className="header-fix">
                    <h2>Team</h2>
                </div>
                <div className="today-income-boxes">
                    <div className="today-income-box">
                        <p><i className="ri-wallet-3-fill"></i>Total Income</p>
                        <h3>0 USDT</h3>
                    </div>
                    <div className="today-income-box">
                        <p><i className="ri-bar-chart-box-fill"></i>Today Income</p>
                        <h3>0 USDT</h3>
                    </div>
                </div>
                <div className="benefit-analysis-wrapper">
                    <h4>Benefit Analysis</h4>
                    <div className="container">
                        <div className="circular-chart">
                            {/* Rating Income Segment */}
                            <div className="segment rating-segment">
                                <span className="tooltip">Rating Income: 0</span>
                            </div>
                            {/* Team Income Segment */}
                            <div className="segment team-segment">
                                <span className="tooltip">Team Income: 0</span>
                            </div>
                            {/* Investment Income Segment */}
                            <div className="segment investment-segment">
                                <span className="tooltip">Investment Income: 0</span>
                            </div>
                            {/* Inner Circle */}
                            <div className="circle-inner">0</div>
                        </div>
                    </div>
                    <div className="benefit-color-wrapper">
                        <div className="benefit-color">
                            <p>Rating Income</p>
                            <h5>0</h5>
                        </div>
                        <div className="benefit-color">
                            <p>Team Income</p>
                            <h5>0</h5>
                        </div>
                        <div className="benefit-color">
                            <p>Investment Income</p>
                            <h5>0</h5>
                        </div>
                    </div>
                </div>
                <div className="team-list-btn-wrapper">
                    <button>Team Member List</button>
                </div>
                <div className="team-members-wrapper">
                    <div className="team-member-boxes">
                        <h6>Total Team Members: 0</h6>
                        <div className="team-member-box">
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Today added</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Last week added</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>This week added</p>
                            </div>
                        </div>
                    </div>
                    <div className="team-member-boxes">
                        <h6>First Generation</h6>
                        <div className="team-member-box">
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Total Members</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Total Income</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Today Income</p>
                            </div>
                        </div>
                    </div>
                    <div className="team-member-boxes">
                        <h6>Second Generation</h6>
                        <div className="team-member-box">
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Total Members</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Total Income</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Today Income</p>
                            </div>
                        </div>
                    </div>
                    <div className="team-member-boxes" style={{ borderBottom: 'none', marginBottom: 0 }}>
                        <h6>Third Generation</h6>
                        <div className="team-member-box">
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Total Members</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Total Income</p>
                            </div>
                            <div className="member-box">
                                <h5>0</h5>
                                <p>Today Income</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
        </div>
    );
}

export default Team;
