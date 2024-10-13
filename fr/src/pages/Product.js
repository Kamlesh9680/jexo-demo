import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../components/Innerpages.css";
import ConfirmModal from '../components/ConfirmModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/BottomNav';


function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [pendingRating, setPendingRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null); // Store userId
  const [userVIPLevel, setUserVIPLevel] = useState(null); // Store userVIPLevel
  const [loading, setLoading] = useState(true); // Loading state
  const userMembership = JSON.parse(localStorage.getItem('membership'));
  let vipLevel = userMembership;

  // Each product will have its own images
  const productImages = {
    0: ["/shoes/n1.png", "/shoes/n2.png", "/shoes/n3.png"],
    1: ["/shoes/ad1.avif", "/shoes/ad2.avif", "/shoes/ad3.avif"],
    2: ["/shoes/pu1.avif", "/shoes/pu2.avif", "/shoes/pu3.avif"],
    3: ["/shoes/sk1.avif", "/shoes/sk2.avif", "/shoes/sk3.avif"],
    4: ["/shoes/", "/shoes/", "/shoes/"],
    5: ["/shoes/", "/shoes/", "/shoes/"],
    6: ["/shoes/", "/shoes/", "/shoes/"],
    7: ["/shoes/", "/shoes/", "/shoes/"],
    8: ["/shoes/", "/shoes/", "/shoes/"],
    9: ["/shoes/", "/shoes/", "/shoes/"],
    // Add more products as needed
  };

  const subPageContent = [
    { title: 'Nike Mercurial Superfly 9 Elite' },
    { title: 'Pharrell Williams NMD S1 RYAT Shoes' },
    { title: 'Deviate NITRO Elite 3 Marathon Series Mens Running Shoes' },
    { title: 'SKX FLOAT-Basketball' },
    { title: 'Page 5' },
    { title: 'Page 5' },
    { title: 'Page 5' },
    { title: 'Page 5' },
    { title: 'Page 5' },
    // Add more content as needed
  ];

  const content = subPageContent[id] || { title: 'Page Not Found', description: '' };
  const images = productImages[id] || [];


  const vipLimitations = [
    { level: 'VIP1', views: 4, time: 66, income: 0.3, price: 50 },
    { level: 'VIP2', views: 10, time: 66, income: 0.6, price: 200 },
    { level: 'VIP3', views: 20, time: 66, income: 0.8, price: 500 },
    { level: 'VIP4', views: 25, time: 66, income: 1.4, price: 1000 },
    { level: 'VIP5', views: 30, time: 66, income: 3.8, price: 3000 },
    { level: 'VIP6', views: 40, time: 66, income: 5.8, price: 6000 },
    { level: 'VIP7', views: 50, time: 66, income: 7.8, price: 8000 },
  ];


  const canRate = (vipLevel, ratingsToday) => {
    // Find the user's VIP level limitation
    const userLimit = vipLimitations.find(vip => vip.level === vipLevel);

    if (!userLimit) {
      console.error('VIP level not found.');
      return false; // User has no rating ability if VIP level is not recognized
    }
    console.log("Can Count fetching")
    

    // Check if the user has reached their daily rating limit
    return ratingsToday < userLimit.views;
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Navigate back
  const goBack = () => {
    navigate(-1);
  };


  const calculateEarnings = (rating) => {

    const vipData = {
      VIP1: 0.3,
      VIP2: 0.6,
      VIP3: 0.8,
      VIP4: 1.4,
      VIP5: 3.8,
      VIP6: 5.8,
      VIP7: 7.8,
    };
    return vipData[vipLevel] * (rating / 5); // Adjust earnings based on rating (out of 5)
  };

  const openModal = (rate) => {
    setPendingRating(rate); // Store pending rating
    setIsModalOpen(true); // Open modal
  };


  const confirmRating = async () => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    const ratingsToday = await getTodaysRatings(userData.id); // Fetch the number of ratings today

    if (!canRate(vipLevel, ratingsToday)) {
      toast.error(`You have reached your daily limit of ratings for your ${vipLevel} level.`, {
        position: "top-right",
        autoClose: 3000,
      });
      return; 
    }

    const earnings = calculateEarnings(pendingRating); // Calculate earnings based on the rating
    setRating(pendingRating); // Confirm rating
    setIsModalOpen(false); // Close modal

    // Call API to update userPayment collection with new earnings
    try {
      await axios.post('http://localhost:5000/api/update-earnings', {
        userId: userData.id,
        earnings: earnings,
      });
      toast.success('Rating submitted! Earnings will be added to your member points.', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error updating earnings:', error);
      toast.error('There was an error submitting your rating. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const cancelRating = () => {
    setIsModalOpen(false); // Close modal without setting the rating
  };

  const getTodaysRatings = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ratings/today/${userId}`);
      console.log("Rate Count fetching")
      return response.data.rateCount; 
    } catch (error) {
      console.error('Error fetching today\'s ratings:', error);
      return 0;
    }
  };


  // Recommendations logic
  const allImages = [
    "../nike.jpeg", "../nike.jpeg", "../nike.jpeg", "../nike.jpeg", "../nike.jpeg",
  ];

  const recommendations = allImages
    .filter((_, index) => index !== parseInt(id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Touch and scroll for mobile and desktop
  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    e.target.setAttribute('data-startX', touchStartX);
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchStartX = e.target.getAttribute('data-startX');

    if (touchStartX - touchEndX > 50) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Swipe left
    } else if (touchEndX - touchStartX > 50) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Swipe right
    }
  };

  // const handleWheel = (e) => {
  //   if (e.deltaY > 0) {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Scroll down
  //   } else {
  //     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Scroll up
  //   }
  // };

  return (
    <div className="page-wrapper">
      <div className="page-container2">
        <div className="header-fix">
          <i className="ri-arrow-left-line" onClick={goBack}></i>
          <h2>Product Details</h2>
        </div>

        <div className="product-content-wrapper">


          {/* Slider */}
          <div
            className="slider-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          // onWheel={handleWheel}
          >
            <img src={images[currentImageIndex]} alt="Slider" />
          </div>

          <h3 className="product-title">Product Name: <span>{content.title}</span></h3>

          {/* Rating */}
          <div className="rating">
            <h3>Rate this product:</h3>
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={i < rating ? "ri-star-fill" : "ri-star-line"}
                onClick={() => openModal(i + 1)} // Open modal on rating click
              ></i>
            ))}
          </div>

          <div className="note">
            <p>Note: Your earning reward will be calculated according to product rating.</p>
          </div>

          {/* Recommendations */}
          <div className="recommendations">
            <h3>Recommended Products:</h3>
            <div className="recommendation-boxes">
              {recommendations.map((image, index) => (
                <div className="recommendation-box" key={index}>
                  <img src={image} alt={`Recommendation ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={cancelRating}
          onConfirm={confirmRating}
          rating={pendingRating}
        />
        <Navbar />
        <ToastContainer />
      </div>
    </div>
  );
}

export default Product;
