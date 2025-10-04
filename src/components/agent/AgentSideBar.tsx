import { useState } from "react";
import { agentLogout } from "../../redux/slices/agentSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  Users as UsersIcon,
  UserCog,
  Map,
  PlusCircle,
  Clock,
  Key,
  CheckSquare,
  Settings as SettingsIcon,
  LogOut,
  LucideIcon,
} from "lucide-react";

type LinkItem = {
  to: string;
  icon: LucideIcon;
  label: string;
};

const AdminSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const ToNewPage = () => {
    navigate(`/agent/newOrders`);
  };
  const ToAcceptPage = () => {
    navigate(`/agent/acceptedOrders`);
  };
  const ToHistoryPage = () => {
    navigate(`/agent/orderHistory`);
  };
  const profile = () => {
    navigate(`/agent/profile`);
  };
  const changePassword = () => {
    navigate(`/agent/changePassword`);
  };
  const map = () => {
    navigate(`/agent/map`);
  };
  const Settings = () => {
    navigate(`/agent/Settings`);
  };

  const logout = async () => {
    dispatch(agentLogout());
    navigate("/agent/login");
  };

  const links: LinkItem[] = [
    { to: "/agent/newOrders", icon: Clock, label: "ToNewPage" },
    { to: "/agent/acceptedOrders", icon: PlusCircle, label: "ToAcceptPage" },
    { to: "/agent/orderHistory", icon: CheckSquare, label: "ToHistoryPage" },
    { to: "/agent/profile", icon: UserCog, label: "profile" },
    { to: "/agent/changePassword", icon: Key, label: "changePassword" },
    { to: "/agent/map", icon: Map, label: "map" },
    { to: "/agent/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <>
      <div className="hidden md:block">
        <aside className=" w-64 h-full bg-gray-900 text-gray-300 flex flex-col fixed">
          <div className="p-6 text-2xl font-bold border-b border-gray-700">
            Agent Panel
          </div>
          <nav className=" mt-7 p-4 space-y-4 ">
            <a
              onClick={ToNewPage}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Pending Orders
            </a>
            <a
              onClick={ToAcceptPage}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Accepted Orders
            </a>
            <a
              onClick={ToHistoryPage}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Delivered Orders
            </a>
            <a
              onClick={profile}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              My Profile
            </a>
            <a
              onClick={changePassword}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Password Change
            </a>
            <a
              onClick={map}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              My Map
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

      <div className="md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-600"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden h-full w-16 bg-gray-900 flex flex-col items-center py-4 space-y-6 shadow-lg fixed left-0 top-0">
          <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-lg">
            <span
              className="text-white font-bold text-lg"
              onClick={toggleSidebar}
            >
              N
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-6 mt-8">
            {links.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                title={label}
                className={({ isActive }) =>
                  `p-2 rounded-lg hover:bg-gray-700 text-gray-400 transition-colors ${
                    isActive ? "bg-gray-800 text-blue-400" : ""
                  }`
                }
              >
                <Icon size={22} />
              </NavLink>
            ))}

            {/* Logout at bottom */}
            <div className="mt-auto">
              <button
                onClick={() => logout()}
                title="Logout"
                className="p-2 rounded-lg hover:bg-red-600 text-gray-400 transition-colors"
              >
                <LogOut size={22} />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default AdminSideBar;
