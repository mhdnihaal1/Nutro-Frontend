import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { agentLogout } from "../../redux/slices/agentSlice";
import AdminSideBar from "../../components/admin/AdminSideBar";

const AgentRequestDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = location.state?.orderData;

  console.log(order)

  const agent = useSelector((state: RootState) => state.agentAuth);
  const Agent = agent?.agentInfo


  useEffect(() => {
    if (!Agent) {
      navigate("/agent/login");
    }
  }, [Agent]);



  if (!order) return <p className="text-center text-red-500">No order data available.</p>;


  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
  {/* Sidebar */}
  <div className="w-full lg:w-64">
    <AdminSideBar />
  </div>

  {/* Main Content */}
  <div className="md:flex-grow p-4 sm:p-6 lg:p-8 ">
    <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left text-white mb-6">
      Order Details
    </h1>

    <div className="container w-full max-w-3xl mx-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      {/* User Information */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">User Details</h2>
        <p><strong>Name:</strong> {order.userId.name}</p>
        <p><strong>Email:</strong> {order.userId.email}</p>
        <p><strong>Phone:</strong> {order.userId.phone}</p>
      </div>

      {/* Address Information */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">Address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <p><strong>NearBy:</strong> {order?.addres[0]?.nearBy}</p>
          <p><strong>Street:</strong> {order?.addres[0]?.street}</p>
          <p><strong>City:</strong> {order?.addres[0]?.city}</p>
          <p><strong>State:</strong> {order?.addres[0]?.state}</p>
          <p><strong>PostalCode:</strong> {order?.addres[0]?.postalCode}</p>
        </div>
      </div>

      {/* Cloth Items */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">Cloth Items</h2>
        <ul className="list-disc list-inside space-y-1">
          {order.clothItems.map((item: any) => (
            <li key={item.clothItemId} className="text-sm sm:text-base">
              <strong>{item.name}</strong> ({item.category}) - {item.quantity} x ${item.unitPrice}
              <span className="text-gray-400"> ({item.service})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary */}
      <div className="mt-4 space-y-2">
        <p><strong>Delivery Mode:</strong> {order.deliveryMode}</p>
        <p className="text-base sm:text-lg font-semibold">
          <strong>Total Price:</strong> ${order.totalPrice}
        </p>
      </div>

      {/* Back Button */}
      <div className="flex justify-center lg:justify-start">
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 w-full sm:w-auto"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default AgentRequestDetails;
