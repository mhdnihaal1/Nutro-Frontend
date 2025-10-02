import React, { useEffect, useState } from "react";
import { getConcerns, sendReply, deleteConcern } from "../../api/admin";
//
import AdminSideBar from "../../components/admin/AdminSideBar";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
}
interface Concern {
  _id: string;
  userId: User;
  subject: string;
  summary: string;
  email: string;
}

const AdminConcerns: React.FC = () => {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const response = await getConcerns();
        if (response?.data) {
          setConcerns(response.data);
        }
      } catch (err) {
        setError("Failed to fetch concerns");
      } finally {
        setLoading(false);
      }
    };

    fetchConcerns();
  }, []);

  const handleReply = async (concernId: string, userId: string) => {
    try {
      if (!replyText) {
        toast.error("Reply message cannot be empty");
        return;
      }
      // const data = {concernId  , userId , replyText }

      const response = await sendReply(concernId, userId, replyText);
      if (response?.status === 200) {
        toast.success("Reply sent successfully!");
        setReplyText("");
      } else {
        toast.error(response?.data?.message || "Failed to send reply");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (concernId: string) => {
    try {
      const res = await deleteConcern(concernId);
      if (res) {
        setConcerns((prev) =>
          prev.filter((concern) => concern._id !== concernId)
        );

        toast.success("Concern deleted successfully.");
      } else {
        toast.error("Failed to delete concern.");
      }
    } catch (error) {
      console.error("Error deleting concern:", error);
      toast.error("Something went wrong while deleting concern.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-10 md:ml-64">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Manage User Concerns
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : concerns.length === 0 ? (
          <p className="text-center text-gray-400">No concerns available.</p>
        ) : (
          <div className="space-y-6">
            {/* ---------- DESKTOP VIEW (lg+) ---------- */}
            {Array.isArray(concerns) ? (
              <div className="hidden lg:block">
                <div className="grid grid-cols-6 gap-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                  <h2 className="text-lg font-semibold">User</h2>
                  <h2 className="text-lg font-semibold">Subject</h2>
                  <h2 className="text-lg font-semibold col-span-2">Summary</h2>
                  <h2 className="text-lg font-semibold">Reply</h2>
                  <h2 className="text-lg font-semibold">Action</h2>
                </div>

                <ul className="space-y-4 mt-4">
                  {Array.isArray(concerns) &&
                    concerns.map((concern) => (
                      <li
                        key={concern._id}
                        className="grid grid-cols-6 gap-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                      >
                        <p className="text-gray-300 truncate">
                          {concern.userId.name}
                        </p>
                        <p className="text-gray-300 truncate">
                          {concern.subject}
                        </p>
                        <p className="text-gray-400 truncate col-span-2">
                          {concern.summary}
                        </p>
                        <input
                          type="text"
                          placeholder="Reply..."
                          className="p-2 rounded bg-gray-900 text-white border border-gray-600"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() =>
                              handleReply(concern._id, concern.userId._id)
                            }
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => handleDelete(concern._id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <p className="flex justify-center pt-[30vh]">No concerns found</p>
            )}
            {/* ---------- MOBILE/TABLET VIEW (<lg) ---------- */}
            <div className="block lg:hidden space-y-4">
              {Array.isArray(concerns) &&
                concerns.map((concern) => (
                  <div
                    key={concern._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 space-y-3"
                  >
                    <p className="text-gray-300">
                      <span className="font-semibold">User: </span>
                      {concern.userId.name}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Subject: </span>
                      {concern.subject}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-semibold">Summary: </span>
                      {concern.summary}
                    </p>

                    <input
                      type="text"
                      placeholder="Reply..."
                      className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() =>
                          handleReply(concern._id, concern.userId._id)
                        }
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => handleDelete(concern._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConcerns;
