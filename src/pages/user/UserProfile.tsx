// import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // User icon if no picture
import { RootState } from "../../redux/store";
import { userLogout } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth);
  const User = user?.userInfo;
 
  const logout = async () => {
     dispatch(userLogout());
    navigate("/user/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="container mx-auto px-6 py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="p-2 mr-[270vh] bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="mb-6">
            {User?._id == null ? (
              <img
                src={User?._id}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 text-gray-600 mx-auto" />
            )}
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            {User?.name}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{User?.email}</p>

          <div className="flex justify-between gap-4">
            <Link
              to="/user/address"
              className="w-full sm:w-1/3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Address
            </Link>
            <Link
              to="/user/cart"
              className="w-full sm:w-1/3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Cart
            </Link>
          </div>
          <div className="flex justify-between gap-4 mt-10">
            <Link
              to="/user/orders"
              className="w-full sm:w-1/3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Orders
            </Link>
            <Link
              to="/user/passwordChange"
              className="w-full sm:w-1/3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Change Password
            </Link>
          </div>
          <div className="flex justify-between gap-4 mt-10">
            <button
              className="w-full sm:w-1/3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              onClick={logout}
            >
              Logout
            </button>
            <Link
              to="/user/settings"
              className="w-full sm:w-1/3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
