import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/BottomNav';
import "../components/Home.css";

function Home() {
  const images = [
    "/shoes/demo.jpg",
    "/shoes/adidas-box.jpg",
    "/shoes/puma-box.jpg",
    "/shoes/skech-box.jpg",
    "../nike.jpeg",
    "../nike.jpeg",
    "../nike.jpeg",
    "../nike.jpeg",
    "../nike.jpeg",
    "../nike.jpeg",
  ];

  return (
    <div className="page-wrapper">
      <div className="page-container">
        <div className="header">
          <a href="/">Jexo</a>
        </div>
        <div className="top-boxes">
          <div className="top-box">
            <Link to="/invite-friend">
              <div className="top-box-icon">
                <i className="ri-user-add-fill"></i>
              </div>
              <p>Invite Friend</p>
            </Link>
          </div>
          <div className="top-box">
            <Link to="/membership">
              <div className="top-box-icon">
                <i className="ri-vip-crown-fill"></i>
              </div>
              <p>Membership</p>
            </Link>
          </div>
          <div className="top-box">
            <Link to="/introduction">
              <div className="top-box-icon">
                <i className="ri-booklet-fill"></i>
              </div>
              <p>Introduction</p>
            </Link>
          </div>
          <div className="top-box">
            <Link to="/city-partner">
              <div className="top-box-icon">
                <i className="ri-group-fill"></i>
              </div>
              <p>City Partner</p>
            </Link>
          </div>
        </div>
        <div className="main-boxes-wrapper">
          <h2>Top Collection</h2>
          <div className="main-boxes">
            {images.map((image, index) => (
              <div className="main-box">
                <Link to={`/product/${index}`} key={index}>
                  <img src={image} alt={`Image ${index + 1}`} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default Home;
