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
    <div className="min-h-screen bg-black text-white">
        <div className="min-h-screen bg-black text-white flex">
        {/* Sidebar */}
        <AgentSideBar/>  
  
        {/* Main Content */}
        <div className="flex-grow p-8 ml-64">
    
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">New Orders</h1>

     

        <div  className="bg-gray-800 p-6 rounded-lg space-y-6">



        {agentOrders.length === 0 ? (
          <p className="text-gray-400">No orders available.</p>
        ) : (
          agentOrders.map((order,index) => (
              <div key={index}                         
              onClick={() => TodetailsPage(order._id, order)} // Pass orderId and data
              className="bg-gray-700 p-6 flex flex-col mb-6 rounded-lg shadow-md">
               
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-400">
                  <strong>User name:</strong><br />  {order.userId.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>User phone:</strong><br /> {order.userId.phone}
                  </p>
                </div>

                <ul className="space-y-2 ml-4">
                  {order.clothItems.map((item,index) => (
                    <li key={index+3} className="text-gray-300">
                      <strong>{item.name}</strong> ({item.category}) - {item.quantity} x ${item.unitPrice} 
                      <span className="text-gray-500">({item.service})</span>
                      
                    </li>
                    
                  ))}
                  {order.status == "orderPlaced" ?
                   <div className="mt-4 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAcceptOrder(order._id);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Accept Order
                    </button>
                  </div>
                  :
                <></>
                    }
                </ul>

                <div className="mt-4 flex justify-between">
                  <p className="text-lg font-semibold text-gray-200">
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </p>
                  
                  <p className="text-sm text-gray-400">
                    <strong>Delivery Mode:</strong> {order.deliveryMode}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Delivery Mode:</strong> {order.paymentMethod}
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

export default NewOrders;
