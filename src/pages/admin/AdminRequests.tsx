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
      <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <AdminSideBar/>

      {/* Main Content */}
      <div className="flex-grow p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8">Users Orders</h1>

        {/* Orders List in Row Box Style */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <span className="font-semibold text-lg">User Name</span>
                <span className="font-semibold text-lg">Agent Name</span>
                <span className="font-semibold text-lg">DeliveryMode</span>
                <span className="font-semibold text-lg">Total Amount</span>
                <span className="font-semibold text-lg"> Order Status </span>
              </div>

        <ul className="space-y-4">
          {Orders.length === 0 ? (
            <p className="text-gray-400">No orders available.</p>
          ) : (
            Orders.map((order,index) => (
              <li
                    key={index}
                    className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                    >
                <p className="text-gray-400 w-[10vh]">{order.userId?.name || "N/A"}</p>
                <p className="text-gray-400">{order.agentId?.name || "Not Assigned"}</p>
                <p className="text-blue-400">{order.deliveryMode}</p>
                <p className="text-green-400 font-semibold">${order.totalPrice}</p>
                <p className="px-3 py-1 rounded-lg text-sm bg-gray-700 text-white"> {order.status  || "Not Assigned" }</p>
               </li>
            ))
          )}
        </ul>

                {/* {User.map((user,index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                    >
                    {/* Name and Email in a Row */}
                    {/* <p className="text-gray-400">{user.name}</p>
                    <p className="text-gray-400">{user.email}</p>
                    <p className="text-gray-400">{user.phone}</p>
                    <p className="text-gray-400">{user?.userStatus || 'N/A'}</p>
                  </li>
                ))} */} 
        </div>
      </div>
    </div>
  
        
    );
  };

export default AdminRequests
