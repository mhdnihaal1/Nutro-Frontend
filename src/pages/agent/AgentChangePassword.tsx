import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
// import { agentLogout } from "../../redux/slices/agentSlice";
import {
  getAgentData,
  oldPasswordcheck,
  changePassword,
  sendOtp,
} from "api/agent";
import AgentSideBar from "../../components/agent/AgentSideBar";
import toast from "react-hot-toast";

interface Agent {
  name: string;
  email: string;
  phone: string;
  agentStatus: string;
}

const AgentChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpss, setOtpss] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isotpModalOpen, setIsotpModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [errorold, setErrorold] = useState("");
  const [errorotp, setErrorotp] = useState("");

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agentAuth);
  const Agent = agent?.agentInfo?._id;
  const Agentemail = agent?.agentInfo?.email;
  const [, setAgentData] = useState<Agent | null>(null);

  useEffect(() => {
    if (!Agent) {
      navigate("/agent/login");
    }

    const fetchCart = async () => {
      try {
        const res = await getAgentData(Agent);
        if (res?.data?.data) {
          const agent = res?.data?.data;

          setAgentData(agent as Agent);
        } else {
          console.warn("No agent data gets");
        }
      } catch (error) {
        console.error("Failed to fetch agent:", error);
      }
    };
    fetchCart();
  }, [Agent]);

  const handleOldPasswordSubmit = async () => {
    try {
      const res = await oldPasswordcheck(Agent, oldPassword);
      if (typeof res?.data === "string") {
        toast.error(res?.data);
        return;
      }
      if (res?.data?.passwordCompare === true) {
        setOldPassword("");
        setIsModalOpen(true);
        setError("");
      } else {
        console.warn("No agent data gets");
        setErrorold("Incorrect old password");
      }
    } catch (error) {
      console.error("Failed to fetch agent:", error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    const res = await changePassword(Agent, newPassword);
    if (typeof res?.data === "string") {
      toast.error(res?.data);
      return;
    }
    if (res?.data) {
      setIsModalOpen(true);
      setError("");
    } else {
      console.warn("No agent data gets");
      setErrorold("Incorrect old password");
    }
    console.log("Password changed successfully");
    setIsModalOpen(false);
  };

  function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  const forgotpassword = async () => {
    const otps = generateOTP();
    setOtpss(otps);
    setIsotpModalOpen(true);

    const res = await sendOtp(Agentemail, otps);
    if (typeof res?.data === "string") {
      toast.error(res?.data);
      return;
    }
  };

  const handleVerifyOtp = async () => {
    if (otpss === otp) {
      setIsModalOpen(true);
      setIsotpModalOpen(false);
      setErrorotp("");
      setOtp("");
    } else {
      setErrorotp("Entered incorrect otp");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <AgentSideBar />

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-10 md:ml-64">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            🔑 Change Password
          </h1>

          {/* Change Password Card */}
          <div className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl border border-gray-700 p-8">
            {Agent ? (
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">
                  Verify Old Password
                </h2>

                {/* Old Password Input */}
                <input
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/40 text-white mb-3"
                />
                {errorold && (
                  <p className="text-red-500 text-sm mb-3">{errorold}</p>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleOldPasswordSubmit}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition font-semibold"
                >
                  Submit
                </button>

                {/* Forgot Password */}
                <button
                  onClick={forgotpassword}
                  className="mt-4 text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            ) : (
              <p className="text-red-500 text-center">
                No agent details available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for New Password */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl border border-gray-700 w-[90%] max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Enter New Password
            </h2>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/40 text-white mb-4"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/40 text-white"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              onClick={handleChangePassword}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-semibold"
            >
              ✅ Change Password
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {isotpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl border border-gray-700 w-[90%] max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>

            <input
              type="text"
              maxLength={6}
              placeholder="______"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/40 text-center tracking-widest text-white"
            />

            {errorotp && (
              <p className="text-red-500 text-sm mt-2">{errorotp}</p>
            )}

            <button
              onClick={handleVerifyOtp}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold"
            >
              🔐 Verify OTP
            </button>
            <button
              onClick={() => setIsotpModalOpen(false)}
              className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentChangePassword;
