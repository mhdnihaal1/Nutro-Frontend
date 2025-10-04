import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
// import { agentLogout } from "../../redux/slices/agentSlice";
import { getAgentData } from "api/agent";
import AgentSideBar from "../../components/agent/AgentSideBar";

interface Agent {
  name: string;
  email: string;
  phone: string;
  agentStatus: boolean;
  createdAt: string;
}

const AgentProfile = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agentAuth);
  const Agent = agent?.agentInfo._id;
  const [agentData, setAgentData] = useState<Agent | null>(null);

  useEffect(() => {
    if (!Agent) {
      navigate("/agent/login");
    }

    const fetchCart = async () => {
      try {
        const res = await getAgentData(Agent);
        if (res?.data) {
          const agent = res?.data;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <AgentSideBar />

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8 md:ml-64">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-gray-800 bg-opacity-80   rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 border border-gray-700">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-3xl font-bold shadow-lg">
              {agentData?.name?.charAt(0) || "A"}
            </div>

            {/* Basic Info */}
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-3xl font-extrabold text-white">
                {agentData?.name || "Agent Name"}
              </h1>
              <p className="text-gray-400 text-lg">{agentData?.email}</p>
              <p className="text-sm mt-1 px-3 py-1 inline-block rounded-full bg-green-500 text-black font-semibold">
                {agentData?.agentStatus === true
                  ? "Blocked Agent"
                  : " Active Agent"}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-indigo-500/30 transition">
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Phone
              </p>
              <p className="text-xl font-medium text-emerald-400 mt-2">
                {agentData?.phone || "N/A"}
              </p>
            </div>

            {/* Email */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-indigo-500/30 transition">
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Email
              </p>
              <p className="text-xl font-medium text-blue-400 mt-2 break-words">
                {agentData?.email || "N/A"}
              </p>
            </div>

            {/* Status */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-indigo-500/30 transition">
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Status
              </p>
              <p
                className={`text-xl font-medium mt-2 ${
                  agentData?.agentStatus === true
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {agentData?.agentStatus || "Active"}
              </p>
            </div>

            {/* Extra Info */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:shadow-indigo-500/30 transition">
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Joined On
              </p>
              <p className="text-xl font-medium text-purple-400 mt-2">
                {agentData?.createdAt
                  ? new Date(agentData.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
