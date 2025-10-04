import React, { useState } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { userLogout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const home = () => {
    navigate("/user/home");
  };
  const selectcloths = () => {
    navigate("/user/selectcloths");
  };
  const contact = () => {
    navigate("/user/contact");
  };
  const cart = () => {
    navigate("/user/cart");
  };
  const profile = () => {
    navigate("/user/profile");
  };
  const settings = () => {
    navigate("/user/settings");
  };

  const logout = async () => {
    dispatch(userLogout());
    navigate("/user/login");
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container  mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold text-blue-600">
          NutroPro
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={home}
          >
            Home
          </a>
          <a
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={selectcloths}
          >
            Clothes
          </a>
          <a
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={contact}
          >
            Contact
          </a>

          {/* Cart */}
          <a
            className="text-gray-700 hover:text-blue-600 transition"
            onClick={cart}
          >
            <FaShoppingCart className="w-6 h-6" />
          </a>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              <FaUserCircle className="w-6 h-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                <a
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
                  onClick={profile}
                >
                  Profile
                </a>
                <a
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
                  onClick={settings}
                >
                  Settings
                </a>
                <a
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
                  onClick={logout}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-blue-600"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
            onClick={home}
          >
            Home
          </a>
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
            onClick={selectcloths}
          >
            Clothes
          </a>
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
            onClick={contact}
          >
            Contact
          </a>
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
            onClick={cart}
          >
            Cart
          </a>
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
            onClick={profile}
          >
            Profile
          </a>
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
            onClick={settings}
          >
            Settings
          </a>
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white"
            onClick={logout}
          >
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
