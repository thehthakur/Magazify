"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function Navbar() {
  const [username, setUsername] = useState("");
  const currentRoute = usePathname();
  
  const handlesignout = async () => {
    localStorage.removeItem('data-username');
    localStorage.removeItem('data-email');
    setUsername(''); // or an appropriate initial value
    // redirect('/');
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("data-username");
    // const storedemail = localStorage.getItem('data-email')
    // const storedphone = localStorage.getItem('data-phone')

    if (storedUsername) {
      setUsername(storedUsername);
      // setuserPhone(storedphone)
      // setuseremail(storedemail)
    }
  }, []);

  return (
    <nav className="relative py-4 px-6 flex justify-between items-center bg-zinc-200">
      <Link href="/" className="text-3xl font-bold leading-none">
        Magazify
      </Link>

      <ul
        className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6`}
        aria-labelledby="navbar-menu"
      >
        <li>
          <Link
            href="/"
            className={`text-xl ${
              currentRoute === "/"
                ? " text-blue-600 font-bold"
                : "text-gray-400 hover:text-gray-500"
            }`}
          >
            Home
          </Link>
        </li>
        <li class="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            class="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <Link
            href="/about"
            className={`text-lg ${
              currentRoute === "/about"
                ? "text-blue-600 font-bold"
                : "text-gray-400 hover:text-gray-500"
            }`}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link href="/pubaccreate" className={`text-lg ${currentRoute === '/pubaccreate' ? 'text-blue-600 font-bold' : 'text-gray-400 hover:text-gray-500'}`}>Publisher Signup</Link>
        </li>
        <li>
          <Link href="/publogin" className={`text-lg ${currentRoute === '/publogin' ? 'text-blue-600 font-bold' : 'text-gray-400 hover:text-gray-500'}`}>Publisher Login</Link>
        </li>
        {/* ... other menu items ... */}
      </ul>
      {username.length != 0 ? (
        <div className="w-2/12 flex justify-around">
          <Link href='/'
            onClick={handlesignout}
            className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
          >
            Signout
          </Link>
          <Link
            href="/callforsubmi"
            className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          >
            Call for submissions.
          </Link>
        </div>
      ) : (
        <div className="w-2/12 flex justify-around">
          <Link
            href="/sign_in"
            className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
          >
            Sign in
          </Link>
          <Link
            href="/sign_up"
            className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          >
            Sign Up
          </Link>
          
        </div>
      )}

      <div className="navbar-menu relative z-50 hidden">
        {/* ... mobile menu content ... */}
      </div>
    </nav>
  );
}

export default Navbar;
