import React, { useEffect, useState } from "react";
import {
  addAgent,
  getAgents,
  getMaps,
  agentStatus,
  editAgent,
} from "../../api/admin";
import AddAgentModal from "../../components/admin/AddAgentModal";
import EditAgentModal from "../../components/admin/EditAgentModal";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Toaster, toast } from "react-hot-toast";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  agentStatus: boolean;
  map: string;
}

const AdminAgents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);

  const [editId, setEditId] = useState("");

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const edittoggleModal = (_id: string) => {
    setIseditModalOpen(!iseditModalOpen);
    setEditId(_id);
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agents = await getAgents();
        const Maps = await getMaps();

        if (agents?.data && Maps?.data) {
          setAgents(
            Array.isArray(agents?.data) ? (agents?.data as Agent[]) : []
          );
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch agents");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleSaveAgent = async (agentData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    map: string;
  }) => {
    try {
      const response = await addAgent(agentData);
      if (response?.data?.success) {
        toast.success("Agent added successfully");
        setAgents((prev) => [...prev, response?.data?.data?.data]);

        setIsModalOpen(false);
      } else {
        toast.error(response?.data?.data?.message || "Failed to add agent");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  const handleEditAgent = async (agentDatas: {
    name: string;
    email: string;
    password: string;
    phone: string;
    map: string;
  }) => {
    try {
      const _id = editId;
      const { name, email, password, phone, map } = agentDatas;
      const Datas = { _id, name, email, password, phone, map };

      const response = await editAgent(Datas);
      if (response?.data) {
        toast.success("Agent edited successfully");
        setAgents((prev) =>
          prev.map((agent) => (agent._id == _id ? response.data : agent))
        );

        setIseditModalOpen(false);
      } else {
        toast.error(response?.data?.data?.message || "Failed to edit agent");
        setIseditModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handlestatus = async (agentId: string) => {
    try {
      const res = await agentStatus(agentId);
      console.log(res);
      if (res) {
        setAgents((prev) =>
          prev.map((agent) => (agent._id == agentId ? res?.data : agent))
        );

        toast.success("Agent status changed successfully.");
      } else {
        toast.error("Failed to delete map.");
      }
    } catch (error) {
      console.error("Error deleting map:", error);
      toast.error("Something went wrong while agent status changing.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
  <AdminSideBar />

  <div className="flex-grow p-2 sm:p-6 lg:p-8 md:ml-64">
    <h1 className="text-3xl font-bold mb-8">Manage Agents</h1>

    {/* Add Agent Button */}
    <button
      onClick={toggleModal}
      className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 mb-8"
    >
      Add Agent
    </button>

    {loading ? (
      <p className="text-center text-gray-400">Loading...</p>
    ) : error ? (
      <p className="text-center text-red-500">{error}</p>
    ) : (
      <div className="space-y-4">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid grid-cols-5 gap-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-center">Name</h2>
          <h2 className="text-xl font-semibold text-center">Email</h2>
          <h2 className="text-xl font-semibold text-center">Mobile</h2>
          <h2 className="text-xl font-semibold text-center">Status</h2>
          <h2 className="text-xl font-semibold text-center">Action</h2>
        </div>

        {/* Agents List */}
        {agents.length === 0 ? (
          <p className="text-gray-400">No agents available.</p>
        ) : (
          <ul className="space-y-4">
            {agents.map((agent, index) => (
              <li
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-5 gap-4 items-center text-center">
                  <p className="truncate">{agent?.name || "N/A"}</p>
                  <p className="truncate">{agent?.email || "Not Assigned"}</p>
                  <p className="text-blue-400">{agent?.phone || "N/A"}</p>
                  <p
                    className={`font-semibold ${
                      agent?.agentStatus ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {agent?.agentStatus ? "Inactive" : "Active"}
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      className={`px-3 py-1 rounded-lg text-sm font-semibold transition duration-300 text-white ${
                        agent?.agentStatus
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-red-600 hover:bg-red-500"
                      }`}
                      onClick={() => handlestatus(agent._id)}
                    >
                      {agent?.agentStatus ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => edittoggleModal(agent._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-2">
                  <p className="flex justify-between">
                    <span className="font-semibold">Name:</span>
                    {agent?.name || "N/A"}
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Email:</span>
                    {agent?.email || "Not Assigned"}
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Mobile:</span>
                    <span className="text-blue-400">
                      {agent?.phone || "N/A"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`font-semibold ${
                        agent?.agentStatus ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {agent?.agentStatus ? "Inactive" : "Active"}
                    </span>
                  </p>
                  <div className="flex justify-between gap-2">
                    <button
                      className={`flex-1 px-3 py-1 rounded-lg text-sm font-semibold transition duration-300 text-white ${
                        agent?.agentStatus
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-red-600 hover:bg-red-500"
                      }`}
                      onClick={() => handlestatus(agent._id)}
                    >
                      {agent?.agentStatus ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => edittoggleModal(agent._id)}
                      className="flex-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>

  <EditAgentModal
    iseditOpen={iseditModalOpen}
    oneditClose={() => setIseditModalOpen(false)}
    agentDatas={handleEditAgent}
  />

  <AddAgentModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    agentData={handleSaveAgent}
  />
</div>

  );
};

export default AdminAgents;
