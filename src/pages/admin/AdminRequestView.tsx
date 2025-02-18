import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from "../../redux/slices/adminSlice";
import AdminSideBar from "../../components/admin/AdminSideBar";

const AdminRequestView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agents, setAgents] = useState([
      { id: 1, name: "Agent A", email: "agentA@example.com" },
      { id: 2, name: "Agent B", email: "agentB@example.com" },
    ]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    const handleAddAgent = (event: React.FormEvent) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
  
      const name = formData.get("name") as string | null;
      const email = formData.get("email") as string | null;
      if (name && email) {
        const newAgent = {
          id: agents.length + 1,
          name: name,
          email: email,
        };
  
        setAgents([...agents, newAgent]);
        toggleModal();
      } else {
        alert("Please fill in all fields.");
      }
    };
  

    return (
      <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <AdminSideBar/>


      {/* Main Content */}
      <div className="flex-grow p-8 ml-64">
       <h1 className="text-3xl font-bold mb-8">Manage Agents</h1>
  
          {/* Add Agent Button */}
          <button
            onClick={toggleModal}
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
          >
            Add Agent
          </button>
  
          {/* Agents List */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Agents List</h2>
            {agents.length === 0 ? (
              <p className="text-gray-400">No agents available.</p>
            ) : (
              <ul className="space-y-4">
                {agents.map((agent) => (
                  <li
                    key={agent.id}
                    className="bg-gray-900 p-4 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{agent.name}</p>
                      <p className="text-gray-400 text-sm">{agent.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
  
        {/* Add Agent Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New Agent</h2>
              <form onSubmit={handleAddAgent}>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

export default AdminRequestView
