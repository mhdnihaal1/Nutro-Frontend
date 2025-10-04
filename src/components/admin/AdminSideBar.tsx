import { useState } from "react";
import { adminLogout } from "../../redux/slices/adminSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  LayoutDashboard,
  ShoppingCart,
  Users as UsersIcon,
  UserCog,
  Map,
  Package,
  Tag,
  Wrench,
  MessageCircle,
  Settings as SettingsIcon,
  LogOut,
  LucideIcon, // 👈 import the type
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
  };
  const Settings = () => {
    navigate(`/admin/Settings`);
  };

  const logout = async () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };
  const links: LinkItem[] = [
    { to: "/admin/Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/Requests", icon: ShoppingCart, label: "Orders" },
    { to: "/admin/Users", icon: UsersIcon, label: "Users" },
    { to: "/admin/agents", icon: UserCog, label: "Agents" },
    { to: "/admin/maps", icon: Map, label: "Maps" },
    { to: "/admin/Items", icon: Package, label: "Items" },
    { to: "/admin/Offers", icon: Tag, label: "Offers" },
    { to: "/admin/Services", icon: Wrench, label: "Services" },
    { to: "/admin/Concerns", icon: MessageCircle, label: "Concerns" },
    { to: "/admin/Settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <>
      <div className="hidden md:block">
        <aside className="w-64 h-full bg-gray-900 text-gray-300 flex flex-col fixed">
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

      <div className="md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-600"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden h-full  w-16 bg-gray-900 flex flex-col items-center py-4 space-y-6 shadow-lg fixed left-0 top-0">
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
