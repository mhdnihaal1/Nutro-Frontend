import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../redux/slices/adminSlice";
import { getUsers ,UserStatus} from "../../api/admin";
import { Toaster, toast } from "react-hot-toast";
import AdminSideBar from "../../components/admin/AdminSideBar";


interface IUser  {
  _id:string;
  name: string;
  phone: number;
  email: string;
  password: string;
  userStatus:boolean;

}

const AdminUsers = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch() 
 
  const [ User , setUsers ] = useState<IUser[]>([])


  useEffect(() => {

    const fetchData = async () => {

      const user = await getUsers()
      console.log(user)

      if(user?.data){
        console.log(user?.data)
        const orde = user?.data
        setUsers(Array.isArray(orde) ? orde : [])
      }       

    }
    fetchData()
  },[])


  const handleUserStatus = async (userId:string) => {
    try {
      console.log(userId)
      const res = await UserStatus(userId); 
      if (res) {
        console.log(res)
        setUsers((prev) => prev.map((user) => user._id == userId ? res.data : user));
        toast.success("user  status changed successfully.")

      } else {
        toast.error("Failed to delete map.")
      }
    } catch (error) {
      // console.error("Error deleting map:", error);
      toast.error("Something went wrong while user status changing .")
    } 
   }


  return (
    <div className="min-h-screen bg-black text-white flex">
    {/* Sidebar */}
    <AdminSideBar/>

    {/* Main Content */}
    <div className="flex-grow p-8 ml-64">
    <h1 className="text-3xl font-bold mb-8">Users</h1>

    <div className="space-y-4">
    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-xl font-semibold">Name</h2>
            <h2 className="text-xl font-semibold">Email</h2>
            <h2 className="text-xl font-semibold pl-10">Mobile</h2>
            <h2 className="text-xl font-semibold  ">User Status</h2>
            <h2 className="text-xl font-semibold mr-10">Action</h2>
          </div>

          {User.length === 0 ? (
  <p className="text-gray-400 text-center">No users available.</p>
) : (
  <ul className="space-y-4">
    {User.map((user, index) => (
      <li
        key={index}
        className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
      >
        {/* User Name - Fixed Width */}
        <p className="text-gray-400 w-40 truncate">{user?.name || "N/A"}</p>

        {/* Email - Fixed Width */}
        <p className="text-gray-400 w-80 truncate ml-[10vh] ">{user?.email || "Not Assigned"}</p>

        {/* Phone - Fixed Width */}
        <p className="text-blue-400 w-32 text-center ">{user?.phone || "N/A"}</p>

        {/* User Status - Fixed Width */}
        <p className="text-green-400 font-semibold w-24 text-center  ml-[20vh] ">
          {user?.userStatus == true ? "inActive" : "Active"}
        </p>
        {/* Block/Unblock Button */}
        <button
          className={`px-3 py-1  ml-[25vh] rounded-lg text-sm font-semibold transition duration-300 
            ${user?.userStatus == true 
              ? "bg-green-600 hover:bg-green-500 text-white" 
              : "bg-red-600 hover:bg-red-500 text-white"}`}
          onClick={() => handleUserStatus(user._id)}
        >
          {user?.userStatus == false ? "Block" : "Unblock"}
        </button>
                 
      </li>
    ))}
  </ul>
)}

        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
