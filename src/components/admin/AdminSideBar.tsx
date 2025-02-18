import React from "react";
import { adminLogout } from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Dashboard = () => {
    navigate(`/admin/Dashboard`);
  };
  const Requests = () => {
    navigate(`/admin/Requests`);
  };
  const Users = () => {
    navigate(`/admin/Users`);
  };
  const agentss = () => {
    navigate(`/admin/agents`);
  };
  const mapss = () => {
    navigate(`/admin/maps`);
  };
  const Items = () => {
    navigate(`/admin/Items`);
  };
  const Offers = () => {
    navigate(`/admin/Offers`);
  };
  const Services = () => {
    navigate(`/admin/Services`);
  };
  const Concerns = () => {
    navigate(`/admin/Concerns`);
  }
  const Settings = () => {
    navigate(`/admin/Settings`);
  };

  const logout = async () => {
    console.log(123);
    dispatch(adminLogout());
    navigate("/admin/login");
  };
  return (
    <div>
      <aside className="w-64 h-100 bg-gray-900 text-gray-300 flex flex-col fixed">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className=" mt-7 p-4 space-y-4 ">
          <a
            onClick={Dashboard}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Dashboard
          </a>
          <a
            onClick={Requests}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Orders
          </a>
          <a
            onClick={Users}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Users
          </a>
          <a
            onClick={agentss}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Agents
          </a>
          <a
            onClick={mapss}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Maps
          </a>
          <a
            onClick={Items}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Items
          </a>
          <a
            onClick={Offers}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Offers
          </a>
          <a
            onClick={Services}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Services
          </a>
          <a
            onClick={Concerns}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Concerns
          </a>
          <a
            onClick={Settings}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Settings
          </a>
        </nav>
        <div className="p-4 border-t mt-6 border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSideBar;
