import React, { useState } from 'react';
import '../input.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-[#61da61] top-0 right-0 w-full left-0 h-14 flex items-center justify-between px-14 py-2 text-slate-50">
      <Link to='/' className="font-bold text-2xl md:text-4xl text-[#000080]">Vishwas</Link>
      <nav className="flex items-center gap-3">
        <Link to='/market'>
          <button type="button" className="text-white bg-[#000080] hover:bg-[#0f6a06] focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Market
          </button>
        </Link>
        {isLoggedIn ? (
          <button type="button" onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Logout
          </button>
        ) : (
          <>
            <Link to='/login'>
              <button type="button" className="text-white bg-[#000080] hover:bg-[#0f6a06] focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Login
              </button>
            </Link>
            <Link to='/signup'>
              <button type="button" className="text-white bg-[#000080] hover:bg-[#0f6a06] focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;