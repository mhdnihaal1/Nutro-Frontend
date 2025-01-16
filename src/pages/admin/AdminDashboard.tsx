import React, { useState } from 'react'

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agents, setAgents] = useState([
      { id: 1, name: "Agent A", email: "agentA@example.com" },
      { id: 2, name: "Agent B", email: "agentB@example.com" },
    ]);
  
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
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
  
        
       {/*content inside this div*/}
        
        </div>
  
        
      </div>
    );
  };

export default AdminDashboard
