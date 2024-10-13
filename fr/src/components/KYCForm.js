import React, { useState } from 'react';
import '../components/Innerpages.css'; // Import the CSS file if needed
import { useNavigate } from "react-router-dom";

const KYCForm = () => {
    const [nationality, setNationality] = useState('');
    const [name, setName] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [vcode, setVcode] = useState('');
    const [aadhaarFront, setAadhaarFront] = useState(null);
    const [aadhaarBack, setAadhaarBack] = useState(null);
    const [email] = useState('usermail'); // Static email for demo purposes
    const navigate = useNavigate(); // Hook for navigation


    const goBack = () => {
        navigate(-1); 
      };

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log({ nationality, name, aadhaar, vcode, aadhaarFront, aadhaarBack });
    };

    return (
        <div className="page-wrapper">
            <div className="page-container2">
                <div className="header-fix">
                    <i className="ri-arrow-left-line" onClick={goBack}></i>
                    <h2>KYC</h2>
                </div>
                <div className="kyc-wrapper">
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            {/* Nationality Field */}
                            <div className="form-group">
                                <label htmlFor="nationality">Nationality</label>
                                <input
                                    type="text"
                                    className="kyc-input"
                                    id="nationality"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                    placeholder="Enter your nationality"
                                    required
                                />
                            </div>

                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="kyc-input"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Aadhaar Number Field */}
                            <div className="form-group">
                                <label htmlFor="aadhaar">Aadhaar Number</label>
                                <input
                                    type="text"
                                    className="kyc-input"
                                    id="aadhaar"
                                    value={aadhaar}
                                    onChange={(e) => setAadhaar(e.target.value)}
                                    placeholder="Enter your Aadhaar number"
                                    required
                                />
                            </div>

                            {/* Email Verification Code Field */}
                            <div className="form-group">
                                <div className="kyc-user-mail">
                                    <label htmlFor="vcode">Email Verification Code</label>
                                    <div>{email}</div>
                                </div>
                                <div className="vcode-container">
                                    <input
                                        type="text"
                                        className="vcode-input"
                                        value={vcode}
                                        onChange={(e) => setVcode(e.target.value)}
                                        placeholder="Enter verification code"
                                        maxLength="6"
                                    />
                                    <button type="button" className="send-btn">Send</button>
                                </div>
                            </div>

                            {/* Aadhaar Card Upload */}
                            <div className="form-group upload-section">
                                <label htmlFor="aadhaar-upload">Upload Aadhaar Card (Front and Back)</label>
                                <input
                                    type="file"
                                    id="aadhaar-front"
                                    name="aadhaar-front"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setAadhaarFront)}
                                    required
                                />
                                <input
                                    type="file"
                                    id="aadhaar-back"
                                    name="aadhaar-back"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setAadhaarBack)}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="form-group">
                                <button type="submit" className="submit-btn">Submit for review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYCForm;
