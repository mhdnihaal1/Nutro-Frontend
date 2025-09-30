import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from "../../redux/slices/adminSlice";
import { getOrders } from "../../api/admin";
import AdminSideBar from "../../components/admin/AdminSideBar";



interface IAgent  {
    name: string;
    phone: number;
    email: string;
    password: string;
    agentStatus:boolean;
};
  
  interface IUser  {
    name: string;
    phone: number;
    email: string;
    password: string;
    userStatus:boolean;
 
  }
interface IAddres {

  _id:object;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;


}
interface IOrderItem {
  clothItemId:string;
  name: string;
  category: string;
  quantity: number;
  service: 'wash' | 'dryClean' | 'iron';
  unitPrice: number;
}
interface IOrder extends Document {
  userId:IUser;
  clothItems: IOrderItem[]; 
  addres: IAddres[];
  status: "orderPlaced" | "orderConfirmed" | "agentAccepted" | "readyForPickup" | "itemOnLaundry" | "itemPacked" | "outForDelivery" | "delivered" | "cancelled";
  totalPrice: number;
  deliveryMode: string;
  agentId: IAgent;
  createdAt: Date;
  updatedAt: Date;
  }

const AdminRequests = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [ Orders , setOrders ] = useState<IOrder[]>([])
   

    useEffect(() => {

      const fetchData = async () => {

        const order = await getOrders()
        console.log(order)

        if(order?.data){
          console.log(order?.data)
          const orde = order?.data
         setOrders(Array.isArray(orde) ? orde : [])
        }       

      }
      fetchData()
    },[])

    return (
      <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
  {/* Sidebar */}
  <AdminSideBar />

  {/* Main Content */}
  <div className="flex-grow p-2 sm:p-6 lg:p-8 md:ml-64">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Users Orders</h1>

    {/* Orders List */}
    <div className="space-y-4">
      {/* Header Row */}
      <div className="hidden lg:grid grid-cols-5 gap-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
        <span className="font-semibold text-sm sm:text-base">User Name</span>
        <span className="font-semibold text-sm sm:text-base">Agent Name</span>
        <span className="font-semibold text-sm sm:text-base">Delivery Mode</span>
        <span className="font-semibold text-sm sm:text-base">Total Amount</span>
        <span className="font-semibold text-sm sm:text-base">Order Status</span>
      </div>

      {/* Orders */}
      <ul className="space-y-4">
        {Orders.length === 0 ? (
          <p className="text-gray-400">No orders available.</p>
        ) : (
          Orders.map((order, index) => (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
            >
              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-5 gap-4 items-center">
                <p className="truncate">{order.userId?.name || "N/A"}</p>
                <p className="truncate">{order.agentId?.name || "Not Assigned"}</p>
                <p className="text-blue-400">{order.deliveryMode}</p>
                <p className="text-green-400 font-semibold">
                  ${order.totalPrice}
                </p>
                <p className="px-3 py-1 rounded-lg text-sm bg-gray-700 text-white text-center">
                  {order.status || "Not Assigned"}
                </p>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">User:</span>
                  <span>{order.userId?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Agent:</span>
                  <span>{order.agentId?.name || "Not Assigned"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Delivery:</span>
                  <span className="text-blue-400">{order.deliveryMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="text-green-400 font-semibold">
                    ${order.totalPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span className="px-2 py-1 rounded-md text-xs bg-gray-700 text-white">
                    {order.status || "Not Assigned"}
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  </div>
</div>

  
        
    );
  };

export default AdminRequests
