import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../components/Team.css';
import Navbar from '../components/BottomNav';


function Team() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.id;
    const [ratingIncome, setratingIncome] = useState(0);
    const [teamIncome, setteamIncome] = useState(0);
    const [todayIncome, setTodayIncome] = useState(0);

    useEffect(() => {
        const fetchRatingIncome = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/ratingincome/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user payment data');
                }
                const data = await response.json();

                // Assuming data is the full userPayment object, set state accordingly
                setratingIncome(data.ratingIncome); // Set ratingIncome from response
                setteamIncome(data.teamIncome);     // Set teamIncome from response (if present)

                const totalIncome = (data.ratingIncome || 0) + (data.teamIncome || 0);
                setTodayIncome(totalIncome);

            } catch (error) {
                console.error('Error fetching user payment data:', error);
            }
        };
        fetchRatingIncome();
    }, [userId]);



    return (
        <div className="page-wrapper">
            <div className="page-container2">
                <div className="header-fix">
                    <h2>Team</h2>
                </div>
                <div className="today-income-boxes">
                    <div className="today-income-box">
                        <p><i className="ri-wallet-3-fill"></i>Total Income</p>
                        <h3>{todayIncome} USDT</h3>
                    </div>
                    <div className="today-income-box">
                        <p><i className="ri-bar-chart-box-fill"></i>Today Income</p>
                        <h3>{todayIncome} USDT</h3>
                    </div>
                </div>
                <div className="benefit-analysis-wrapper">
                    <h4>Benefit Analysis</h4>
                    {/* <div className="container">
                        <div className="circular-chart">
                            <div className="segment rating-segment">
                                <span className="tooltip">Rating Income: 0</span>
                            </div>
                            <div className="segment team-segment">
                                <span className="tooltip">Team Income: 0</span>
                            </div>
                            <div className="segment investment-segment">
                                <span className="tooltip">Investment Income: 0</span>
                            </div>
                            <div className="circle-inner">0</div>
                        </div>
                    </div> */}
                    <div className="benefit-color-wrapper">
                        <div className="benefit-color">
                            <p>Rating Income</p>
                            <h5>{typeof ratingIncome === 'object' ? JSON.stringify(ratingIncome) : ratingIncome}</h5>
                        </div>
                        <div className="benefit-color">
                            <p>Team Income</p>
                            <h5>{typeof teamIncome === 'object' ? JSON.stringify(teamIncome) : teamIncome}</h5>
                        </div>
                        {/* <div className="benefit-color">
                            <p>Investment Income</p>
                            <h5>0</h5>
                        </div> */}
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
