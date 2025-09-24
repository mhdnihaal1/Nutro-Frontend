import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SavePassword } from "../../api/user";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const data = location.state;



  


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Basic Validations
        if (!password || !confirmPassword) {
          setMessage("Both fields are required.");
          return;
        }
    
        if (password.length < 6) {
          setMessage("Password must be at least 6 characters.");
          return;
        }
    
        if (password !== confirmPassword) {
          setMessage("Passwords do not match.");
          return;
        }
    
        try {
          setMessage("");     

          const res = await SavePassword(password,data.email)
    
          if (res) {
            toast.success("Password reset successful!");
            navigate('/user/login')
          } else {
            toast.success("res"); // need to be checked
          }
        } catch (error) {
            toast.success("Server error. Try again later.");
        } 
      };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Change Password</h2>
    

        {message && <p className="text-center text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lm  font-medium text-gray-700">Password</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter  Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="block text-lm  font-medium text-gray-700">Confirm Password</label>
               <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter  Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Reset Password 
          </button>
        </form>
      

        <div className="mt-4 text-center">
          <a href="/user/login" className="text-blue-600 hover:underline text-sm">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
