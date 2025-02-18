import React, { useEffect, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend, ResponsiveContainer } from "recharts";
import { Toaster, toast } from "react-hot-toast";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { adminLogout } from "../../redux/slices/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  getOrders , getUsers , getAgents } from "../../api/admin";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface IUser  {
  _id:string;
  name: string;
  phone: number;
  email: string;
  password: string;
  userStatus:boolean;

}
interface IOrderItem {
  clothItemId: string;
  name: string;
  category: string;
  quantity: number;
  service: 'wash' | 'dryClean' | 'iron';
  unitPrice: number;
}

interface IAddres {

  _id:object;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt?: Date;
  updatedAt?: Date;

}
interface IOrder extends Document {
  userId:string;
  clothItems: IOrderItem[]; 
  addres: IAddres[]; 
  status: "orderPlaced" | "orderConfirmed" | "agentAccepted" | "readyForPickup" | "itemOnLaundry" | "itemPacked" | "outForDelivery" | "delivered" | "cancelled";
  totalPrice: number;
  deliveryMode: string;
  agentId:string;
  createdAt: Date;
  updatedAt: Date;
  }

  const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const options = ["Revenue", "Order", "Orderdistribution", "Agentdeliveries","Users"];
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users , setusers] = useState<IUser[]>([])
  const [orders , setOrders] = useState<IOrder[]>([])
  const [totalSellingPrice, setTotalSellingPrice] = useState<number>(0);
  const [revenueData, setRevenueData] = useState<{ month: string; revenue: number }[]>([]);
  const [ orderDistribution , setOrderDistribution] = useState<{ month: string; order: number }[]>([])
  const [orderData, setOrderData] = useState<{ name: string; value: number }[]>([]);
  const [agentDeliveries, setAgentDeliveries] = useState<{ agent: string; deliveries: number }[]>([]);

  const revenuepdf = useRef<HTMLDivElement | null>(null); 
  const orderspdf = useRef<HTMLDivElement | null>(null); 
  const ditributionpdf = useRef<HTMLDivElement | null>(null); 
  const agentpdf = useRef<HTMLDivElement | null>(null); 
  const userpdf = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
    const user = await getUsers()
    const order = await getOrders()
    const agents = await getAgents();
    console.log(agents?.data)

        if(user?.data && order?.data || agents?.data){
          setusers(Array.isArray(user?.data) ? (user?.data as IUser[]) : []);
          setOrders(Array.isArray(order?.data) ? (order?.data as IOrder[]) : []);

          const request = Array.isArray(order?.data) ? order?.data : [];

          //----------chaert -1
          
          const monthlyRevenues = request?.reduce((acc: Record<string, number>, elem: any) => {
              if (!elem?.createdAt && typeof elem?.totalPrice !== "number" ) return acc; 
              if( elem?.status == "delivered"){
                const month = new Date(elem.createdAt).toLocaleString("en-US", { month: "short" });
                acc[month] = (acc[month] || 0) + elem.totalPrice; 
              }
             
              return acc;
          }, {});
          
          const chartData = Object.entries(monthlyRevenues ?? {}).map(([month, revenue]) => ({
            month,
            revenue,
        }));

            setRevenueData(chartData);
            const total = Object.values(monthlyRevenues ?? {}).reduce((sum, val) => sum + val, 0);
            setTotalSellingPrice(total);

           //--------------------chart -2

           const monthlyOrders = request?.reduce((acc: Record<string, number>, elem: any ,index:any) => {
            if (!elem?.createdAt ) return acc; 
            if( elem?.status == "delivered"){
            const month = new Date(elem.createdAt).toLocaleString("en-US", { month: "short" });
            acc[month] = (acc[month] || 0) + 1; 
            }
            return acc;
        }, {});
        console.log(monthlyOrders)


        const chart2Data = Object.entries(monthlyOrders ?? {}).map(([month, order]) => ({
          month,
          order,
      }));
      console.log(chart2Data)

        setOrderDistribution(chart2Data)

        //----------- pie chart -3

        if (!request || !Array.isArray(request)) return;

  const categoryDistribution = request.reduce((acc: Record<string, number>, { status }) => {
    if (!status) return acc; 

    acc[status] = (acc[status] || 0) + 1; 
    return acc;
  }, {});

  const formattedData = Object.entries(categoryDistribution).map(([name, value]) => ({ name, value }));
  setOrderData(formattedData);

            //----------chart -4 

      const deliveriesMap = request.reduce((acc: Record<string, number>, { agentId, status }) => {
        if (status !== "delivered" || !agentId) return acc; 

        const agentKey = agentId._id.toString(); 
        acc[agentKey] = (acc[agentKey] || 0) + 1;    
            return acc;
      }, {});

      const formatData = agents?.data.map((agent:any) => ({
        agent: agent.name,
        deliveries: deliveriesMap[agent._id] || 0, 
      }));
      setAgentDeliveries(formatData);
            setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch Dashboard data");
        setLoading(false);
      }
    };

    fetchData();
  },[])

  const Drop = async (item:string) => {
    setSelected(item);
     let input:any = revenuepdf.current;
    if(item == 'Revenue'){
       input = revenuepdf.current;
    }else if(item == 'Order'){
      input = orderspdf.current;
    }else if(item == 'Orderdistribution'){
      input = ditributionpdf.current;
    }else if(item == 'Agentdeliveries'){
      input = agentpdf.current;
    }else if(item == 'Users'){
      input = userpdf.current;
    }
  
    html2canvas(input).then((canvas)=>{
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p','mm','a4',true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWIdth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWIdth , pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWIdth * ratio ) / 2;
      const imgY = 30;
      pdf.addImage(imageData,'PNG',imgX,imgY ,imgWIdth * ratio , imgHeight * ratio );
      pdf.save('invoice.pdf')
    })

  }


  const COLORS = ["#FFA500", "#00C49F", "#FF4444"];
  return (
    <div className="min-h-screen bg-black text-white flex">
     <AdminSideBar/>

      <div className="flex-grow p-8 ml-64">
        <div className="flex ">
  <h1 className="text-3xl  font-bold mb-8">Admin Dashboard</h1>
  <div className="relative w-40 ml-[100vh]">
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
      >
        Download pdf
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute w-full mt-2 bg-black text-white rounded-lg shadow-lg overflow-hidden z-10">
          {options.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                Drop(item)
                setIsOpen(false);
              }}
              className="px-4 py-3 cursor-pointer hover:bg-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Revenue Trends Line Chart (Larger) */}
    <div className="bg-gray-800 md:col-span-2 p-6 h-[62vh] rounded-lg" ref={revenuepdf}>
  <h2 className="text-lg font-semibold mb-4 text-white">Revenue Trends</h2>
  
  {/* Responsive Chart Container */}
  <div className="w-full h-full">
    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={revenueData}>
        <XAxis dataKey="month" stroke="#ffffff" />
        <YAxis stroke="#ffffff" tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

    {/* User Registrations & Order Distribution */}
    <div>
      <div className="bg-gray-800 p-6 rounded-lg" ref={orderspdf}>
        <h2 className="text-lg font-semibold mb-4">Orders </h2>
        <BarChart width={300} height={155} data={orderDistribution}>
  <XAxis dataKey="month" stroke="#ffffff" />
  <YAxis stroke="#ffffff" />
  <Tooltip />
  <Bar dataKey="order" fill="#8884d8" />
</BarChart>
      </div>

      <div className="bg-gray-800 p-6 mt-2 rounded-lg" ref={ditributionpdf}>
        <h2 className="text-lg font-semibold mb-4">Order Distribution </h2>
        <PieChart width={300} height={190}>
        <Pie data={orderData} cx={150} cy={100} innerRadius={50} outerRadius={80} fill="#8884d8" dataKey="value" label>
        {orderData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
</PieChart>
      </div>
    </div>
  </div>

  {/* Agent Deliveries Chart */}

  <div className="flex flex-wrap justify-between mt-5 gap-6">
  {/* Agent Deliveries Section */}
  <div className="bg-gray-800 p-6 rounded-lg w-[800px]" ref={agentpdf}>
    <h2 className="text-lg font-semibold mb-4 text-white">Agent Deliveries</h2>
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={agentDeliveries} margin={{ left: 10, right: 10 }}>
          <XAxis dataKey="agent" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Bar dataKey="deliveries" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* User List Section */}
  <div className="bg-gray-800 p-6 rounded-lg w-[53vh]" ref={userpdf}>
    <h2 className="text-lg font-semibold mb-4 text-white">User List</h2>
    <table className="w-full text-white">
      <thead>
        <tr className="border-b">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className="border-b">
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


   <div>
  
    </div>

  </div>
</div>

  );
};

export default AdminDashboard;
