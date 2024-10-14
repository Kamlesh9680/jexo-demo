import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from "react-router-dom";
import '../index.css';

const InvitePage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const [inviteCode, setInviteCode] = useState('');

    useEffect(() => {
        // Retrieve user object from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.inviteCode) {
            setInviteCode(user.inviteCode);
        } else {
            // Handle case where invite code is missing or user not found
            setInviteCode('Please try again later');
        }
    }, []);

    const inviteLink = `https://jexo.vip/user/reg/?inviteCode=${inviteCode}`;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="page-wrapper">
            <div className="page-container2">
                <div className="header-fix">
                    <i className="ri-arrow-left-line" onClick={goBack}></i>
                    <h2>Invite Friend</h2>
                </div>
                <div className="invite-page">

                    <div className="qr-section">
                        <h3>Invitation Code</h3>
                        <QRCodeCanvas value={inviteLink} size={200} />
                        <div className="invite-code">
                            <span>{inviteCode}</span>
                            <button onClick={() => copyToClipboard(inviteCode)}>Copy</button>
                        </div>
                    </div>

                    <div className="invite-link-section">
                        <h4>Invitation Link</h4>
                        <div className="invite-link">
                            <a>{inviteLink}</a>
                            <button onClick={() => copyToClipboard(inviteLink)}>Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;
