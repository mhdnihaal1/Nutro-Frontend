import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { agentLogout } from "../../redux/slices/agentSlice";
import { getAgentData  } from "api/agent";
import AgentSideBar from "../../components/agent/AgentSideBar";

interface Agent {
    name: string;
    email: string;
    phone: string;
    agentStatus: boolean;
  }


const AgentProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agentAuth);
  const Agent = agent?.agentInfo._id;
  const [agentData , setAgentData ] = useState<Agent | null>(null)
  console.log(agentData)


  useEffect(() => {
    if (!Agent) {
      navigate("/agent/login");
    }

    const fetchCart = async () => {
        try {
          const res = await getAgentData(Agent);
              if (res?.data) {
                  const agent = res?.data;  
                  console.log(true,agent)
  
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


  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <AgentSideBar/>  
  
      {/* Main Content */}
      <div className="flex-grow p-8 ml-64 flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
  <div className="w-full max-w-3xl bg-gray-900 bg-opacity-75 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700">
    <h1 className="text-4xl text-center font-extrabold text-white mb-8">Agent Profile</h1>

    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-200 border-b border-gray-700 pb-2">Agent Details</h2>

      {Agent ? (
        <div className="mt-6 space-y-4 text-gray-300">
          <p className="text-lg"><strong className="text-gray-400">Name:</strong> {agentData?.name}</p>
          <p className="text-lg"><strong className="text-gray-400">Email:</strong> {agentData?.email}</p>
          <p className="text-lg"><strong className="text-gray-400">Phone:</strong> {agentData?.phone}</p>
          {/* <p className="text-lg"><strong className="text-gray-400">Agent Status:</strong> {agentData?.agentStatus}</p> */}
        </div>
      ) : (
        <p className="text-lg text-red-500 mt-4 text-center">No agent details available.</p>
      )}

      <div className="flex justify-center mt-6">
       
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default AgentProfile;
