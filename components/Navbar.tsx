"use client";

import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Fungsi untuk menentukan path berdasarkan nama item
  const getPathForItem = (item: string) => {
    switch (item) {
      case 'Home':
        return '/';
      case 'Projects':
        return '/product';
      case 'About Us':
        return '/about_us';
      default:
        return '/';
    }
  };

  return (
    <nav className="navbar">
      {/* Logo Text */}
      <div className="logo-text">FundNation</div>

      {/* Navigation Items */}
      <div className="nav-items">
        {['Home', 'Projects', 'About Us'].map((item) => (
          <Link
            href={getPathForItem(item)}
            key={item}
            className={`nav-item ${pathname === getPathForItem(item) ? 'active' : ''}`}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <button className="creator-btn">For Creators</button>

        <SignedOut>
          <button
            className="login-btn"
            onClick={() => router.push('/sign-in')}
          >
            Login
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>

      {/* Style */}
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
          font-family: 'Sen', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #FFFFFF;
        }

        .nav-item {
          position: relative;
          text-decoration: none;
          color: inherit;
        }

        .nav-item.active {
          color: #1DCD9F;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #1DCD9F;
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
      `}</style>
    </nav>
  );
};

export default Navbar;
