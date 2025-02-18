import React, { useState } from 'react'
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Using react-icons
import { userLogout } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {





        const navigate = useNavigate();
        const dispatch = useDispatch();
      
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      
        const handleDropdownToggle = () => {
          setIsDropdownOpen(!isDropdownOpen);
        };


        const home = () => {
            navigate('/user/home')
        }
        const selectcloths = () => {
            navigate('/user/selectcloths')
        }
        const contact = () => {
            navigate('/user/contact')
        }
        const cart = () => {
            navigate('/user/cart')
        }
        const profile = () => {
            navigate('/user/profile')
        }
        const settings = () => {
            navigate('/user/settings')
        }


        const logout = async () => {
            console.log(123)
        dispatch(userLogout());
        navigate("/user/login");
       }
  return (
    <div>
          {/* Navigation */}
          <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">CleanPro</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
            onClick={home}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </a>
            <a
            onClick={selectcloths}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Clothes
            </a>
            <a
             onClick={contact}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </a>

            {/* Cart Icon */}
            <a
              onClick={cart}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              <FaShoppingCart className="w-6 h-6" />
            </a>

            {/* User Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <FaUserCircle className="w-6 h-6" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                  <a
                    onClick={profile}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                  >
                    Profile
                  </a>
                  <a
                    onClick={settings}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                  >
                    Settings
                  </a>
                  <a
                    href=""
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                    onClick={logout}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default UserNavbar
