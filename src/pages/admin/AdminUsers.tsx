import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../redux/slices/adminSlice";
import { getUsers, UserStatus } from "../../api/admin";
import { Toaster, toast } from "react-hot-toast";
import AdminSideBar from "../../components/admin/AdminSideBar";

interface IUser {
  _id: string;
  name: string;
  phone: number;
  email: string;
  password: string;
  userStatus: boolean;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [User, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUsers();
        console.log(user);

        if (user?.data) {
          console.log(user?.data);
          const orde = user?.data;
          setUsers(Array.isArray(orde) ? orde : []);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch agents");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUserStatus = async (userId: string) => {
    try {
      console.log(userId);
      const res = await UserStatus(userId);
      if (res) {
        console.log(res);
        setUsers((prev) =>
          prev.map((user) => (user._id == userId ? res.data : user))
        );
        toast.success("user  status changed successfully.");
      } else {
        toast.error("Failed to delete map.");
      }
    } catch (error) {
      // console.error("Error deleting map:", error);
      toast.error("Something went wrong while user status changing .");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-grow p-2 sm:p-6 lg:p-8 md:ml-64">
        <h1 className="text-3xl font-bold mb-8">Users</h1>
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-4 ">
            <div className="hidden lg:grid grid-cols-5 gap-4  bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
              <h2 className="text-xl font-semibold">Name</h2>
              <h2 className="text-xl font-semibold">Email</h2>
              <h2 className="text-xl font-semibold">Mobile</h2>
              <h2 className="text-xl font-semibold">User Status</h2>
              <h2 className="text-xl font-semibold">Action</h2>
            </div>

            {User.length === 0 ? (
              <p className="text-gray-400 text-center">No users available.</p>
            ) : (
              <ul className="space-y-4">
                {User.map((user, index) => (
                  <li
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                  >
                    {/* Desktop Grid */}
                    <div className="hidden lg:grid grid-cols-5 gap-4 items-center">
                      <p className="text-gray-400 truncate">
                        {user?.name || "N/A"}
                      </p>
                      <p className="text-gray-400 truncate">
                        {user?.email || "Not Assigned"}
                      </p>
                      <p className="text-blue-400 text-center">
                        {user?.phone || "N/A"}
                      </p>
                      <p className="text-green-400 font-semibold text-center">
                        {user?.userStatus ? "Inactive" : "Active"}
                      </p>
                      <button
                        className={`px-3 py-1 rounded-lg text-sm font-semibold transition duration-300 
                ${
                  user?.userStatus
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-red-600 hover:bg-red-500 text-white"
                }`}
                        onClick={() => handleUserStatus(user._id)}
                      >
                        {user?.userStatus ? "Unblock" : "Block"}
                      </button>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-2">
                      <p className="flex justify-between">
                        <span className="font-semibold">Name:</span>{" "}
                        {user?.name || "N/A"}
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Email:</span>{" "}
                        {user?.email || "Not Assigned"}
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Mobile:</span>
                        <span className="text-blue-400">
                          {user?.phone || "N/A"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Status:</span>
                        <span className="text-green-400 font-semibold">
                          {" "}
                          {user?.userStatus ? "Inactive" : "Active"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Action:</span>{" "}
                        <button
                        className={`px-3 py-1 items-end rounded-lg text-sm font-semibold transition duration-300 
                ${
                  user?.userStatus
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-red-600 hover:bg-red-500 text-white"
                }`}
                        onClick={() => handleUserStatus(user._id)}
                      >
                        {user?.userStatus ? "Unblock" : "Block"}
                      </button>
                      </p>
                      
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
