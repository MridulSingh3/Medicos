import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import profile_pic from "../assets/profile_pic.png";
import menuimg from "../assets/menu_icon.svg";
import crossimg from "../assets/cross_icon.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false); // Profile dropdown toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu toggle

  // Logout logic
  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const handleLogout = () => {
    logOut();
    setShowMenu(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dropdownMenu") &&
        !e.target.closest('img[alt="profile"]')
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 sm:px-10 py-4 flex items-center justify-between relative z-30 font-sans">

      {/* Brand / Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          +
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-800">
          Medicos
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 font-semibold text-xs tracking-wider uppercase text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-1 transition-colors hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `py-1 transition-colors hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
              }`
            }
          >
            All Doctors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `py-1 transition-colors hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
              }`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `py-1 transition-colors hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Profile Avatar / Login Button & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative">
            <img
              src={
                userData?.image && userData.image.trim() !== ""
                  ? userData.image
                  : profile_pic
              }
              alt="profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-blue-500 hover:scale-105 transition-transform"
              onClick={() => setShowMenu((prev) => !prev)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = profile_pic;
              }}
            />

            {/* Profile Dropdown Menu */}
            {showMenu && (
              <div className="dropdownMenu absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-40 text-sm font-medium text-gray-700 animate-in fade-in slide-in-from-top-2">
                <ul className="flex flex-col">
                  <li
                    className="px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                  >
                    My Profile
                  </li>
                  <li
                    className="px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowMenu(false);
                    }}
                  >
                    My Appointments
                  </li>
                  <li
                    className="px-4 py-2.5 hover:bg-red-50 text-red-500 cursor-pointer transition-colors border-t border-gray-100 mt-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            Create Account
          </button>
        )}

        {/* Mobile Hamburger Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-1.5 focus:outline-none"
          aria-label="Open menu"
        >
          <img src={menuimg} alt="menu icon" className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Mobile Sliding Drawer */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <span className="font-bold text-lg text-gray-800">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={crossimg} alt="Close menu" className="w-5 h-5" />
              </button>
            </div>

            <ul className="flex flex-col gap-4 mt-6 text-sm font-semibold uppercase text-gray-700">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/doctors"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`
                }
              >
                All Doctors
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`
                }
              >
                Contact
              </NavLink>
            </ul>
          </div>

          {!token && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full text-center text-sm shadow-md transition-all"
            >
              Create Account
            </button>
          )}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;