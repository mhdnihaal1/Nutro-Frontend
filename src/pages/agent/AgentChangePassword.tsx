import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { agentLogout } from "../../redux/slices/agentSlice";
import { getAgentData , oldPasswordcheck , changePassword , sendOtp} from "api/agent";
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
    const [otp,setOtp] = useState('')
    const [otpss,setOtpss] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isotpModalOpen, setIsotpModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [errorold, setErrorold] = useState("");
    const [errorotp, setErrorotp] = useState("");

    

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agentAuth);
  const Agent = agent?.agentInfo?._id;
  const Agentemail = agent?.agentInfo?.email;
//   console.log(Agent)
  const [agentData , setAgentData ] = useState<Agent | null>(null)
//   console.log(12341234,agentData)   

  useEffect(() => {
    if (!Agent) {
      navigate("/agent/login");
    }

    const fetchCart = async () => {
        try {
          const res = await getAgentData(Agent);
              if (res?.data?.data) {
                  const agent = res?.data?.data;  
                //   console.log(true,agent)
  
                  setAgentData(agent as Agent);
              }else {
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
        const res = await oldPasswordcheck(Agent,oldPassword);
        if (typeof res?.data === "string") {
          toast.error(res?.data);
          return;
      }
        console.log(res)
            if (res?.data?.passwordCompare == true ) {
                setOldPassword('')
                setIsModalOpen(true);
                setError("");
            }else {
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
    const res = await changePassword(Agent,newPassword);
    if (typeof res?.data === "string") {
      toast.error(res?.data);
      return;
  }
    console.log(res)
        if (res?.data ) {
            setIsModalOpen(true);
            setError("");
        }else {
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
    const otps = generateOTP()
    console.log(123,otps)
    setOtpss(otps)
    setIsotpModalOpen(true)

      
    const res = await sendOtp(Agentemail,otps);
    if (typeof res?.data === "string") {
      toast.error(res?.data);
      return;
  }
  }

  const handleVerifyOtp = async () => {
      console.log(otpss,otp)
      if(otpss == otp){
        setIsModalOpen(true)
        setIsotpModalOpen(false)
        setErrorotp("")
        setOtp('')
      }else{
        setErrorotp('Entered incorrect otp')
      }

     

  }

  return (
    <div className=" bg-black text-white flex">
      {/* Sidebar */}
      <AgentSideBar/>  

   {/* Main Content */}
   <div className="flex-grow p-8 ml-64 ">
        <h1 className="text-3xl font-bold text-white mb-6">Change  password</h1>
        <div className="container mx-auto max-w-3xl  bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-300"></h2>
          {Agent ? (
            <div className="mt-1 ">
<div className="flex justify-center items-center min-h-[70vh] bg-gray-900 text-white overflow-hidden">
<div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Change Password</h1>
        
        <label className="block mb-2">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        {errorold && <p className="text-red-500 text-sm mt-2">{errorold}</p>}

        <button
          onClick={handleOldPasswordSubmit}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Submit
        </button>

        <div 
        onClick={forgotpassword}
        className="mt-4 text-blue-400 text-center cursor-pointer hover:underline">
          Forgot Password?
        </div>
      </div>

      {/* Modal for New Password */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center ml-[30vh] bg-black bg-opacity-50">
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-[500px]  min-h-[250px]">
      <h2 className="text-xl font-bold mb-4 text-center">Enter New Password</h2>

      <label className="block mb-2">New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
      />

      <label className="block mt-4 mb-2">Confirm New Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
      />

      {/* Ensure the error message does not shrink the modal */}
      <p className={`text-red-500 text-sm mt-2 min-h-[20px] ${error ? "block" : "invisible"}`}>
        {error || "Placeholder"} 
      </p>  

      <button
        onClick={handleChangePassword}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
      >
        Change Password
      </button>

      <button
        onClick={() => setIsModalOpen(false)}
        className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
)}
{isotpModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-[400px] min-h-[200px]">
      <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>

      <label className="block mb-2 text-center">Enter the 6-digit OTP</label>
      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white text-center tracking-widest"
      />

      {/* Ensure the error message does not shrink the modal */}
      {errorotp && <p className="text-red-500 text-sm mt-2">{errorotp}</p>}


      <button
        onClick={handleVerifyOtp}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Verify OTP
      </button>

      <button
        onClick={() => setIsotpModalOpen(false)}
        className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
)}


    </div>
            </div>
          ) : (
            <p className="text-red-500">No agent details available.</p>
          )}
          <button onClick={() => navigate(-1)} className="mt-6 bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700">
            Back
          </button>
        </div>

     </div>
    </div>
    
  );
};


export default AgentChangePassword ;
