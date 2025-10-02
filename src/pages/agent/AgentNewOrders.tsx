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

const NewOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [agentOrders, setAgentOrders] = useState<IOrder[]>([]);
  const agent = useSelector((state: RootState) => state.agentAuth);
  const agentId = agent?.agentInfo?._id;

  useEffect(() => {
    if (!agentId) {
      navigate("/agent/login");

    }; 

    const fetchData = async () => {
      try {
        const response = await getAgentOrders(agentId);
        if(response?.data){
          const orders = response?.data;
          const sortOrders = orders.filter((item: IOrder) => item.status === "orderPlaced");  
          setAgentOrders(Array.isArray(sortOrders) ? sortOrders : []);
        }
       
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [agentId]); 
 

  const TodetailsPage = (orderId: string, orderData: IOrder) => {
    navigate(`/agent/requestDetails/${orderId}`, { state: { orderData } });
   }


   const handleAcceptOrder = async (_id: string) => {
    console.log(_id);
  
    const response = await acceptOrder(_id);
    if (typeof response?.data === "string") {
      toast.error(response?.data);
      return;
  }
    if (response?.data) {
      const updatedOrder = response?.data;
      console.log("Updated Order:", updatedOrder);
  
      setAgentOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== updatedOrder._id)

      );
  
      toast.success("Order accepted successfully!");
    } else {
      toast.error("Failed to accept order");
    }
  };


  return (
   <div className="min-h-screen bg-black text-white flex flex-col md:flex-row" >
  {/* Sidebar */}
  <AgentSideBar />

  {/* Main Content */}
  <div className="flex-grow p-4 md:p-8 md:ml-64">
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        New Orders
      </h1>

      {/* Orders Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agentOrders.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">
            No orders available.
          </p>
        ) : (
          agentOrders.map((order, index) => (
            <div
              key={index}
              onClick={() => TodetailsPage(order._id, order)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-xl p-6 transition cursor-pointer border border-gray-700"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">User</p>
                  <p className="font-semibold">{order.userId.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-blue-400 font-semibold">
                    {order.userId.phone}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <p className="text-gray-300 font-medium mb-2">Cloth Items</p>
                <ul className="space-y-1">
                  {order.clothItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-300 flex justify-between"
                    >
                      <span>
                        <strong>{item.name}</strong> ({item.category})
                      </span>
                      <span className="text-blue-400">
                        {item.quantity} × ${item.unitPrice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accept Button */}
              {order.status === "orderPlaced" && (
                <div className="mb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcceptOrder(order._id);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Accept Order
                  </button>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
                <p>
                  <span className="text-gray-400">Total Price:</span>{" "}
                  <span className="font-bold text-blue-400">
                    ${order.totalPrice}
                  </span>
                </p>
                <p className="text-gray-400">
                  Delivery:{" "}
                  <span className="font-medium">{order.deliveryMode}</span>
                </p>
                <p className="text-gray-400">
                  Payment:{" "}
                  <span className="font-medium">{order.paymentMethod}</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default NewOrders;
