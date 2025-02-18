import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../api/user";
import toast from "react-hot-toast";

interface IUser {
  _id: string;
  name: string;
  phone: number;
  email: string;
  password: string;
  userStatus: boolean;
}

const UserPasswordChange = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<IUser>();

  const user1 = useSelector((state: RootState) => state.auth);
  const UserId = user1?.userInfo?._id;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await changePassword(UserId, currentPassword, newPassword);
    if (typeof res?.data === "string") {
      toast.error(res?.data);
      return;
  }
    if (res?.data._id) {
      setUser(res?.data);
      toast.success("Password changed successfully");
    } else {
      toast.error(res?.data);
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
  };

  return (
    <div className="max-w-md mt-[16vh] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="p-2 mr-[270vh] bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Current Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-2 rounded-lg"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-2 rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Confirm New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-2 rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label className="text-sm">Show Password</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default UserPasswordChange;
