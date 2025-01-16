import React, { useState } from "react";

const AdminAgents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState([
    { id: 1, name: "Agent A", email: "agentA@example.com"  , mobile: 3423233423 },
    { id: 2, name: "Agent B", email: "agentB@example.com"  , mobile: 3423233423 },
  ]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddAgent = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const mobile = formData.get("mobile") as number | null;
    if (name && email&&mobile) {
      const newAgent = {
        id: agents.length + 1,
        name: name,
        email: email,
        mobile:mobile
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
      <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-grow p-4 space-y-4">
        <a
              href="Dashboard"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="Requests"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Requests
            </a>
            <a
              href="Users"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Users
            </a>
            <a
              href="agents"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Agents
            </a>
            <a
              href="Items"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Items
            </a>
            <a
              href="Offers"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Offers
            </a>
            <a
              href="Services"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Settings
            </a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Manage Agents</h1>

        {/* Add Agent Button */}
        <button
          onClick={toggleModal}
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
        >
          Add Agent
        </button>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-around items-center mb-4">
            <h2 className="text-xl font-semibold">Name</h2>
            <h2 className="text-xl font-semibold">Email</h2>
            <h2 className="text-xl font-semibold">Mobile</h2>
          </div>

          <div>
            {agents.length === 0 ? (
              <p className="text-gray-400">No users available.</p>
            ) : (
              <ul className="space-y-4">
                {agents.map((agent) => (
                  <li
                    key={agent.id}
                    className="bg-gray-900 p-4 rounded-md flex justify-around items-center"
                  >
                    {/* Name and Email in a Row */}
                    <p className="font-semibold text-white">{agent.name}</p>
                    <p className="text-gray-400">{agent.email}</p>
                    <p className="font-semibold text-white">{agent.mobile}</p>


                  </li>
                ))}
              </ul>
            )}
          </div>
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
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">Mobile</label>
                <input
                  type="number"
                  name="mobile"
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

export default AdminAgents;
