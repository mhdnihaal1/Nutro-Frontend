import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import { otpVerify } from "../../api/user";

const UserOtp = () => {
  const [otp, setOtp] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid 6-digit OTP.");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (otp.length === 6) {
      let response = await otpVerify(
        { otp: parseInt(otp) },
        { email: data.email }
      );
      if (response) {
        toast.success(response.data.message);
        localStorage.setItem("token", response?.data.token);
        dispatch(setCredentials(response?.data.data));
        navigate("/user/home");
      } else {
        console.log(response);
      }
    } else {
      setErrorMessage("OTP must be 6 digits.");
    }
  };

  return (
    <div className="otp-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="otp-box bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Enter OTP</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter the 6-digit OTP sent to your registered email or phone.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={handleInputChange}
            className="otp-input px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
            maxLength={6}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="submit-btn w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Didn't receive the OTP?{" "}
          <button className="text-blue-500 underline hover:text-blue-600">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserOtp;
