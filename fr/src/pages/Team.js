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
    const [mainteamMember, setmainTeamMember] = useState(0);
    const [teamMembers, setTeamMembers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [addedToday, setAddedToday] = useState(0);
    const [addedLastWeek, setAddedLastWeek] = useState(0);
    const [addedThisWeek, setAddedThisWeek] = useState(0);

    useEffect(() => {
        const fetchRatingIncome = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/ratingincome/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user payment data');
                }
                const data = await response.json();

                console.log("Fetched data:", data); // Log the entire response data

                // Convert teamMemberData from object to array
                const members = Object.values(data.teamMemberData || {}); // Get an array of member objects
                setratingIncome(data.ratingIncome);
                setteamIncome(data.teamIncome);
                setmainTeamMember(data.totalteamMembers);
                setTeamMembers(members);
                setTotalMembers(members.length); // Total members

                // Process teamMemberData to count added members
                countAddedMembers(members);

                const totalIncome = (data.ratingIncome || 0) + (data.teamIncome || 0);
                setTodayIncome(totalIncome);

            } catch (error) {
                console.error('Error fetching user payment data:', error);
            }
        };
        fetchRatingIncome();
    }, [userId]);

    const countAddedMembers = (members) => {
        if (!Array.isArray(members)) {
            console.warn('members is not an array:', members);
            return; // Exit if members is not an array
        }
    
        console.log("Members array:", members); // Log members array
    
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start of this week (Monday)
        const startOfLastWeek = new Date(startOfWeek); 
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 7); // Start of last week
    
        let todayCount = 0;
        let lastWeekCount = 0;
        let thisWeekCount = 0;
    
        members.forEach(member => {
            const registrationDate = new Date(member.registrationDate);
            console.log(`Member registration date: ${registrationDate}`); // Log registration date for each member
    
            // Check if added today
            if (isSameDay(registrationDate, new Date())) {
                todayCount++;
                thisWeekCount++; // Also count today in this week
            } else if (registrationDate >= startOfWeek) {
                // Check if added this week (but not today)
                thisWeekCount++;
            } else if (registrationDate >= startOfLastWeek && registrationDate < startOfWeek) {
                // Check if added last week
                lastWeekCount++;
            }
        });
    
        console.log(`Counts - Today: ${todayCount}, This Week: ${thisWeekCount}, Last Week: ${lastWeekCount}`); // Log the counts
    
        setAddedToday(todayCount);
        setAddedThisWeek(thisWeekCount);
        setAddedLastWeek(lastWeekCount);
    };
    

    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };

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
                    <div className="benefit-color-wrapper">
                        <div className="benefit-color">
                            <p>Rating Income</p>
                            <h5>{typeof ratingIncome === 'object' ? JSON.stringify(ratingIncome) : ratingIncome}</h5>
                        </div>
                        <div className="benefit-color">
                            <p>Team Income</p>
                            <h5>{typeof teamIncome === 'object' ? JSON.stringify(teamIncome) : teamIncome}</h5>
                        </div>
                    </div>
                </div>
                <div className="team-list-btn-wrapper">
                    <button>Team Member List</button>
                </div>
                <div className="team-members-wrapper">
                    <div className="team-member-boxes">
                        <h6>Total Team Members: {typeof mainteamMember === 'object' ? JSON.stringify(mainteamMember) : mainteamMember}</h6>
                        <div className="team-member-box">
                            <div className="member-box">
                                <h5>{addedToday}</h5>
                                <p>Today added</p>
                            </div>
                            <div className="member-box">
                                <h5> {addedThisWeek}</h5>
                                <p>This week added</p>
                            </div>
                            <div className="member-box">
                                <h5> {addedLastWeek}</h5>
                                <p>Last week added</p>
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
                </div>
                <Navbar />
            </div>
        </div>
    );
}

export default Team;
