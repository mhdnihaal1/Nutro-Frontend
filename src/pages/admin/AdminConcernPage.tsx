import React, { useEffect, useState } from "react";
import { getConcerns ,sendReply ,deleteConcern}  from "../../api/admin";
// 
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Toaster, toast } from "react-hot-toast";

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
  const [replyText, setReplyText] = useState< string >('');

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const response = await getConcerns();
        console.log(response)
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
      const data = {concernId  , userId , replyText }
      console.log(data)

      const response = await sendReply(concernId  , userId , replyText);
          console.log(response)
      if (response?.status == 200) {
        toast.success("Reply sent successfully!");
        setReplyText('')
      } else {
        toast.error(response?.data?.message || "Failed to send reply");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (concernId:string)=>{
    try {
        console.log(concernId);
        const res = await deleteConcern(concernId);
        if (res) {
            setConcerns((prev) => prev.filter((concern) => concern._id !== concernId));
  
          toast.success("Concern deleted successfully.");
        } else {
          toast.error("Failed to delete concern.");
        }
      } catch (error) {
        console.error("Error deleting concern:", error);
        toast.error("Something went wrong while deleting concern.");
      }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSideBar />
      <div className="flex-grow p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8">Manage User Concerns</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : concerns.length === 0 ? (
          <p className="text-gray-400">No concerns available.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
              <h2 className="text-xl font-semibold w-40">User Email</h2>
              <h2 className="text-xl font-semibold w-64">Subject</h2>
              <h2 className="text-xl font-semibold w-96">Summary</h2>
              <h2 className="text-xl font-semibold w-96">Reply</h2>
              <h2 className="text-xl  font-semibold">Action</h2>
            </div>

            <ul className="space-y-4">
              
              {Array.isArray(concerns) && concerns.length > 0 && concerns.map((concern) => (
                <li
                  key={concern._id}
                  className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                >
                  <p className="text-gray-400 w-40 truncate">{concern.userId.name }</p>
                  <p className="text-gray-400 w-64 truncate">
                    {concern.subject}
                  </p>
                  <p className="text-gray-400 w-96 truncate">{concern.summary}</p>

                  <input
                    type="text"
                    placeholder="Type your reply..."
                    className="w-93 p-2 border rounded bg-gray-900 text-white"
                    value={replyText}
                    onChange={(e) =>
                      setReplyText( e.target.value )
                    }
                  />

                  <button
                    onClick={() => handleReply(concern._id, concern.userId._id)}
                    className="ml-[11vh] px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-blue-500"
                  >
                     Reply
                  </button>
                  <button
                    onClick={() => handleDelete(concern._id)}
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-blue-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
              
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConcerns;
