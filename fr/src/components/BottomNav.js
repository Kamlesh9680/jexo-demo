import React, { useState } from "react";
import "./BottomNav.css";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Set initial active index
  const [bgColor, setBgColor] = useState("crimson"); // Set initial background color

  const navItems = [
    { title: "Home", icon: "ri-home-5-line", color: "#dc143c", link: "/" },
    { title: "Team", icon: "ri-team-line", color: "#3c40c6", link: "/team" },
    { title: "Membership", icon: "ri-vip-diamond-line", color: "#05c46b", link: "/membership" },
    { title: "Record", icon: "ri-dvd-line", color: "#0fbcf9", link: "/records" },
    { title: "Profile", icon: "ri-user-line", color: "#ffa801", link: "/profile" },
  ];

  const handleClick = (index, color) => {
    setActiveIndex(index);
    setBgColor(color);
  };

  return (
    <div className="navbar-container" style={{ backgroundColor: bgColor }}>
      <div className="navigation">
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`list ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleClick(index, item.color)}
              data-color={item.color}
            >
              <a
                href={item.link}
                style={{
                  color: activeIndex === index ? item.color : "#808080", // Active item in its color, rest in gray
                }}
              >
                <span className="icon">
                  <i className={item.icon}></i>
                </span>
                <span className="title">{item.title}</span>
              </a>
            </li>
          ))}
          <div className="indicator">
            <div
              className="indicator-inner"
              style={{ backgroundColor: navItems[activeIndex].color }}
            ></div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
