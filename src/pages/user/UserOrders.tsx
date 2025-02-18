import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getOrders } from "../../api/user";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import { X, CheckCircle } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import UserConcerns from "../../components/user/UserConcerns";
import { sendConcern , handleCancelorder} from "../../api/user";

interface IAgent {
  name: string;
  phone: number;
  email: string;
  password: string;
  agentStatus: boolean;
}

interface IUser {
  name: string;
  phone: number;
  email: string;
  password: string;
  userStatus: boolean;
}

interface IAddres {
  _id: string;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface IOrderItem {
  clothItemId: string;
  name: string;
  category: string;
  quantity: number;
  service: "wash" | "dryClean" | "iron";
  unitPrice: number;
}

interface IOrder {
  _id: string;
  userId: IUser;
  clothItems: IOrderItem[];
  addres: IAddres[];
  status:
    | "orderPlaced"
    | "orderConfirmed"
    | "agentAccepted"
    | "readyForPickup"
    | "itemOnLaundry"
    | "itemPacked"
    | "outForDelivery"
    | "delivered"
    | "cancelled";
  totalPrice: number;
  deliveryMode: string;
  paymentMethod?: string;
  agentId?: IAgent;
  createdAt: string;
  updatedAt: string;
}

const UserOrders = () => {
  const navigate = useNavigate();
  const [Orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const user = useSelector((state: RootState) => state.auth);
  const UserId = user?.userInfo._id;
  const UserEmail = user?.userInfo.email;
  const orderStatusSteps = [
    { status: "orderPlaced", label: "Order Placed" },
    { status: "orderConfirmed", label: "Order Confirmed" },
    { status: "agentAccepted", label: "Agent Accepted" },
    { status: "readyForPickup", label: "Ready for Pickup" },
    { status: "itemOnLaundry", label: "Item on Laundry" },
    { status: "itemPacked", label: "Item Packed" },
    { status: "outForDelivery", label: "Out for Delivery" },
    { status: "delivered", label: "Delivered" },
    { status: "cancelled", label: "Cancelled" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await getOrders(UserId);
        if (order?.data) {
          setOrders(Array.isArray(order.data) ? order.data : []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [selectedOrder]);

  const handleCancelOrder = async (orderId: string) => {
    try {
      const response = await handleCancelorder(orderId);
  
      if (response?.data) {
        const updatedOrder = response.data;
  
        setOrders((prevOrders: any) => 
          [...prevOrders.map((order: any) => 
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )]
        );
  
        setSelectedOrder((prevOrder: IOrder | null) => 
          prevOrder?._id === updatedOrder._id ? { ...updatedOrder, status: "cancelled" } : prevOrder
        );
        
        
        
  
        toast.success("Order cancelled successfully!");
      } else {
        toast.error("Failed to cancel order");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  

  const handleSubmitConcern = async (concern: {
    subject: string;
    summary: string;
  }) => {
    console.log("User Concern:", concern, UserEmail);
    try {
      const email = UserEmail;
      const { subject, summary } = concern;
      const Datas = { email, subject, summary };

      const response = await sendConcern(UserId, subject, summary);
      if (response?.data) {
        toast.success("Concern sended successfully");

        handleCloseModal();
      } else {
        toast.error(
          response?.data?.data?.message || "Failed to send your  concern"
        );
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-3xll mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="p-2 mb-4 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        className="mt-4 ml-[250vh] px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        onClick={handleOpenModal}
      >
        Concerns
      </button>

      <UserConcerns
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        concern={handleSubmitConcern}
      />

      <h1 className="text-2xl font-bold text-center mb-4">Your Orders</h1>

      <div className="space-y-4 mt-10">
        {Orders.length !== 0 ? (
          Orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow-lg flex justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedOrder(order)}
            >
              <div>
                <p className="text-lg font-semibold">
                  Order ID: ORD {order._id.replace(/\D/g, "")}
                </p>
                <p className="text-gray-600">
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-600">
                  Items:{" "}
                  {order.clothItems
                    .map((item) => `${item.name} x${item.quantity}`)
                    .join(", ")}
                </p>
                <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>

                <p className="text-gray-600">Total: ${order.totalPrice}</p>
              </div>
              <div>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "agentAccepted"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center">You have no orders yet</h2>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[600px] shadow-lg relative flex">
            <div className="w-1/2">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-bold mb-4">Order Details</h2>

              <p>
                <strong>Order ID:</strong> ORD{" "}
                {selectedOrder._id.replace(/\D/g, "")}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <p className="mt-2">
                <strong>Items:</strong>
              </p>
              <ul className="list-disc pl-5">
                {selectedOrder.clothItems.map((item, index) => (
                  <li key={index}>
                    {item.name} x{item.quantity} ({item.service}) - $
                    {item.unitPrice * item.quantity}
                  </li>
                ))}
              </ul>

              <p className="mt-2">
                <strong>Total Price:</strong> ${selectedOrder.totalPrice}
              </p>
              <p>
                <strong>Delivery Mode:</strong> {selectedOrder.deliveryMode}
              </p>
              <p ><strong>Payment Method: </strong> {selectedOrder.paymentMethod}</p>


              {selectedOrder.agentId && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Agent Details</h3>
                  <p>
                    <strong>Name:</strong> {selectedOrder.agentId.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedOrder.agentId.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.agentId.email}
                  </p>
                </div>
              )}

              {selectedOrder.addres && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Delivery Address</h3>
                  <p>
                    <strong>Street:</strong> {selectedOrder.addres[0].street}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedOrder.addres[0].city}
                  </p>
                  <p>
                    <strong>State:</strong> {selectedOrder.addres[0].state}
                  </p>
                  <p>
                    <strong>Postal Code:</strong>{" "}
                    {selectedOrder.addres[0].postalCode}
                  </p>
                </div>
              )}
              {selectedOrder.status !== "delivered" &&
                selectedOrder.status !== "cancelled" && (
                  <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleCancelOrder(selectedOrder._id)}
                  >
                    Cancel Order
                  </button>
                )}
            </div>

            <div className="w-1/2 relative flex flex-col items-start pl-6 border-l-4 border-gray-300">
              <h3 className="text-lg font-semibold mb-4">Order Status</h3>

              {orderStatusSteps
  .filter((step) => 
    selectedOrder.status === "cancelled"
      ? step.status === "orderPlaced" || step.status === "cancelled"
      : selectedOrder.status === "delivered"
      ? step.status !== "cancelled" // Remove "Cancelled" when delivered
      : true
  )
  .map((step, index) => {
    const isActive = step.status === selectedOrder.status; // Only highlight the current status

    return (
      <div key={step.status} className="flex items-start relative mb-4">
        {index !== orderStatusSteps.length - 1 && (
          <div
            className={`absolute left-3 top-6 h-8 w-[2px] ${
              isActive ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        )}

        <div
          className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
            isActive
              ? "bg-green-500 text-white border-green-500"
              : "bg-gray-200 text-gray-500 border-gray-300"
          }`}
        >
          {isActive ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          )}
        </div>
          
        <div className="ml-4">
          <p
            className={`text-lg font-semibold ${
              isActive ? "text-green-700" : "text-gray-500"
            }`}
          >
            {step.label}
          </p>
        </div>
      </div>
    );
  })}




            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
