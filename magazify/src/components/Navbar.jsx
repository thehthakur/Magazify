"use client";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative py-4 px-6 flex justify-between items-center bg-white">
      <Link href="/" className="text-3xl font-bold leading-none">
        <img src="/logo.png" alt="logo" className="absolute top-0 bottom-0 h-full" />
      </Link>

      <div className="lg:hidden">
        <button
          className="navbar-burger flex items-center text-blue-600 p-3"
          onClick={toggle}
        >
          <svg
            className="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="..." />
          </svg>
        </button>
      </div>

      <ul
        className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6`}
        aria-labelledby="navbar-menu"
      >
        <li>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-500">
            Home
          </Link>
        </li>
        <li className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="..."
            />
          </svg>
        </li>
        <li>
          <Link href="/about" className="text-sm text-blue-600 font-bold">
            About Us
          </Link>
        </li>
        {/* ... other menu items ... */}
      </ul>

      <div className="hidden lg:block">
        <Link
          href="/sign_in"
          className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
        >
          Sign In
        </Link>
        <Link
          href="/sign_up"
          className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
        >
          Sign Up
        </Link>
      </div>

      <div className="navbar-menu relative z-50 hidden">
        {/* ... mobile menu content ... */}
      </div>
    </nav>
  );
}

export default Navbar;
