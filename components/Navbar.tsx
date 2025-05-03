"use client";

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <nav className="navbar">
      {/* Logo Text */}
      <div className="logo-text">FundNation</div>

      {/* Navigation Items */}
      <div className="nav-items">
        {['Home', 'Projects', 'About Us'].map((item) => (
          <Link
            href="#"
            key={item}
            className={`nav-item ${activeTab === item ? 'active' : ''}`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <button className="creator-btn">For Creators</button>
        <button className="login-btn">Login</button>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 50px;
          height: 100px;
          background-color: #222222;
        }

        .logo-text {
          font-family: 'Sen', sans-serif;
          font-weight: 700;
          font-size: 25px;
          color: #FFFFFF;
        }

        .nav-items {
          display: flex;
          gap: 40px;
        }

        .nav-item {
          font-family: 'Sen', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #FFFFFF;
          text-decoration: none;
          position: relative;
          padding: 8px 0;
          transition: color 0.3s ease;
        }

        .nav-item.active {
          color: #1DCD9F;
        }

        .auth-buttons {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .creator-btn {
          font-family: 'Sen', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #FFFFFF;
          background-color: #169976;
          border: none;
          border-radius: 15px;
          width: 150px;
          height: 40px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-btn {
          font-family: 'Sen', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #FFFFFF;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 15px;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #1DCD9F;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;