import React, { useState } from "react";

const AgentRequest = () => {
  const [activeTab, setActiveTab] = useState("new");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Agent Requests</h1>

        {/* Tabs for Sort Design */}
        <div className="flex justify-between bg-gray-800 rounded-lg p-2 mb-6">
          <button
            onClick={() => handleTabClick("new")}
            className={`flex-1 text-center py-3 rounded-lg font-semibold ${
              activeTab === "new" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            New Order
          </button>
          <button
            onClick={() => handleTabClick("accepted")}
            className={`flex-1 text-center py-3 rounded-lg font-semibold ${
              activeTab === "accepted" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            Accepted Order
          </button>
          <button
            onClick={() => handleTabClick("history")}
            className={`flex-1 text-center py-3 rounded-lg font-semibold ${
              activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            Order History
          </button>
        </div>

        {/* Content for Each Tab */}
        <div className="bg-gray-800 p-6 rounded-lg">
          {activeTab === "new" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">New Orders</h2>
              <p className="text-gray-400">No new orders available.</p>
            </div>
          )}
          {activeTab === "accepted" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Accepted Orders</h2>
              <p className="text-gray-400">No accepted orders available.</p>
            </div>
          )}
          {activeTab === "history" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Order History</h2>
              <p className="text-gray-400">No order history available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentRequest;
