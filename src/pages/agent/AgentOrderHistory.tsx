import React, { useEffect, useState } from "react";
import { getAgentOrders , acceptOrder , deliveredOrder} from "../../api/agent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Toaster, toast } from "react-hot-toast";
import { agentLogout } from "../../redux/slices/agentSlice";
import AgentSideBar from "../../components/agent/AgentSideBar";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone:string
}

interface IAddress {
  _id: string;
  fullAddress: string;
  city: string;
  zipCode: string;
}

interface IAgent {
  _id: string;
  name: string;
  phone: string;
}
interface IOrderItem {
  clothItemId: string;
  name: string;
  category: string;
  quantity: number;
  service: string;
  unitPrice: number;
}

interface IOrder {
  _id: string;
  userId: IUser;
  clothItems: IOrderItem[];
  addressId: IAddress;
  status: string;
  totalPrice: number;
  deliveryMode: string;
  paymentMethod: string;
  agentId: IAgent;
  createdAt: Date;
  updatedAt: Date;
}

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [agentOrders, setAgentOrders] = useState<IOrder[]>([]);
  const agent = useSelector((state: RootState) => state.agentAuth);
  const agentId = agent?.agentInfo?._id;

  useEffect(() => {
    if (!agentId) {
        navigate("/agent/login");
    }

    const fetchData = async () => {
      try {
      
        const response = await getAgentOrders(agentId);
        if(response?.data){
          const orders = response?.data;
          console.log("Fetched Orders:", orders);
          const sortOrders = orders.filter((item: IOrder) => item.status === "delivered");
  
          console.log('sorted' , sortOrders)
  
          setAgentOrders(Array.isArray(sortOrders) ? sortOrders : []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [agentId]); 



 

  const TodetailsPage = (orderId: string, orderData: IOrder) => {
    console.log('you will go to details soon')
    navigate(`/agent/requestDetails/${orderId}`, { state: { orderData } });
   }


   


  return (
    <div className="min-h-screen bg-black text-white">
  <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
    {/* Sidebar */}
    <AgentSideBar />

    {/* Main Content */}
    <div className="flex-grow p-4 md:p-8 md:ml-64">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Order History</h1>

        <div className="bg-gray-800 p-4 md:p-6 rounded-lg space-y-6">
          {agentOrders.length === 0 ? (
            <p className="text-gray-400">No orders available.</p>
          ) : (
            agentOrders.map((order, index) => (
              <div
                key={index}
                onClick={() => TodetailsPage(order._id, order)} // Pass orderId and data
                className="bg-gray-700 p-4 md:p-6 flex flex-col mb-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
              >
                {/* User Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <p className="text-sm text-gray-400">
                    <strong>User name:</strong> <br /> {order.userId.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>User phone:</strong> <br />
                    <span className="text-blue-400">{order.userId.phone}</span>
                  </p>
                </div>

                {/* Order Items */}
                <ul className="space-y-2 ml-2 md:ml-4">
                  {order.clothItems.map((item, idx) => (
                    <li key={idx + 3} className="text-gray-300">
                      <strong>{item.name}</strong> ({item.category}) -{" "}
                      <span className="text-blue-400">
                        {item.quantity} x ${item.unitPrice}
                      </span>{" "}
                      <span className="text-gray-500">({item.service})</span>
                    </li>
                  ))}

                  {/* Status */}
                  <div className="mt-4 flex justify-end">
                    <p className="text-sm">
                      <strong>Order Status:</strong>{" "}
                      <span
                        className={
                          order.status === "delivered"
                            ? "text-green-400"
                            : order.status === "agentAccepted"
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        {order.status}
                      </span>
                    </p>
                  </div>
                </ul>

                {/* Footer Info */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
                  <p className="text-lg font-semibold text-gray-200">
                    <strong>Total Price:</strong>{" "}
                    <span className="text-blue-400">${order.totalPrice}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Delivery Mode:</strong> {order.deliveryMode}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default OrderHistory;
