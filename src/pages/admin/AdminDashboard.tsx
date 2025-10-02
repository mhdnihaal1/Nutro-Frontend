import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Toaster, toast } from "react-hot-toast";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { adminLogout } from "../../redux/slices/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders, getUsers, getAgents } from "../../api/admin";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface IUser {
  _id: string;
  name: string;
  phone: number;
  email: string;
  password: string;
  userStatus: boolean;
}
interface IOrderItem {
  clothItemId: string;
  name: string;
  category: string;
  quantity: number;
  service: "wash" | "dryClean" | "iron";
  unitPrice: number;
}

interface IAddres {
  _id: object;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface IOrder extends Document {
  userId: string;
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
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    "Revenue",
    "Order",
    "Orderdistribution",
    "Agentdeliveries",
    "Users",
  ];
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setusers] = useState<IUser[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalSellingPrice, setTotalSellingPrice] = useState<number>(0);
  const [revenueData, setRevenueData] = useState<
    { month: string; revenue: number }[]
  >([]);
  const [orderDistribution, setOrderDistribution] = useState<
    { month: string; order: number }[]
  >([]);
  const [orderData, setOrderData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [agentDeliveries, setAgentDeliveries] = useState<
    { agent: string; deliveries: number }[]
  >([]);

  const revenuepdf = useRef<HTMLDivElement | null>(null);
  const orderspdf = useRef<HTMLDivElement | null>(null);
  const ditributionpdf = useRef<HTMLDivElement | null>(null);
  const agentpdf = useRef<HTMLDivElement | null>(null);
  const userpdf = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUsers();
        const order = await getOrders();
        const agents = await getAgents();

        if ((user?.data && order?.data) || agents?.data) {
          setusers(Array.isArray(user?.data) ? (user?.data as IUser[]) : []);
          setOrders(
            Array.isArray(order?.data) ? (order?.data as IOrder[]) : []
          );

          const request = Array.isArray(order?.data) ? order?.data : [];

          //----------chaert -1

          const monthlyRevenues = request?.reduce(
            (acc: Record<string, number>, elem: any) => {
              if (!elem?.createdAt && typeof elem?.totalPrice !== "number")
                return acc;
              if (elem?.status == "delivered") {
                const month = new Date(elem.createdAt).toLocaleString("en-US", {
                  month: "short",
                });
                acc[month] = (acc[month] || 0) + elem.totalPrice;
              }

              return acc;
            },
            {}
          );

          const chartData = Object.entries(monthlyRevenues ?? {}).map(
            ([month, revenue]) => ({
              month,
              revenue,
            })
          );

          setRevenueData(chartData);
          const total = Object.values(monthlyRevenues ?? {}).reduce(
            (sum, val) => sum + val,
            0
          );
          setTotalSellingPrice(total);

          //--------------------chart -2

          const monthlyOrders = request?.reduce(
            (acc: Record<string, number>, elem: any, index: any) => {
              if (!elem?.createdAt) return acc;
              if (elem?.status == "delivered") {
                const month = new Date(elem.createdAt).toLocaleString("en-US", {
                  month: "short",
                });
                acc[month] = (acc[month] || 0) + 1;
              }
              return acc;
            },
            {}
          );

          const chart2Data = Object.entries(monthlyOrders ?? {}).map(
            ([month, order]) => ({
              month,
              order,
            })
          );

          setOrderDistribution(chart2Data);

          //----------- pie chart -3

          if (!request || !Array.isArray(request)) return;

          const categoryDistribution = request.reduce(
            (acc: Record<string, number>, { status }) => {
              if (!status) return acc;

              acc[status] = (acc[status] || 0) + 1;
              return acc;
            },
            {}
          );

          const formattedData = Object.entries(categoryDistribution).map(
            ([name, value]) => ({ name, value })
          );
          setOrderData(formattedData);

          //----------chart -4

          const deliveriesMap = request.reduce(
            (acc: Record<string, number>, { agentId, status }) => {
              if (status !== "delivered" || !agentId) return acc;

              const agentKey = agentId._id.toString();
              acc[agentKey] = (acc[agentKey] || 0) + 1;
              return acc;
            },
            {}
          );

          const formatData = agents?.data.map((agent: any) => ({
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
  }, []);

  const Drop = async (item: string) => {
    setSelected(item);
    let input: any = revenuepdf.current;
    if (item == "Revenue") {
      input = revenuepdf.current;
    } else if (item == "Order") {
      input = orderspdf.current;
    } else if (item == "Orderdistribution") {
      input = ditributionpdf.current;
    } else if (item == "Agentdeliveries") {
      input = agentpdf.current;
    } else if (item == "Users") {
      input = userpdf.current;
    }

    html2canvas(input).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWIdth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWIdth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWIdth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imageData,
        "PNG",
        imgX,
        imgY,
        imgWIdth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  const COLORS = ["#FFA500", "#00C49F", "#FF4444"];
  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-grow p-2 md:ml-64">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          {/* Dropdown */}
          <div className="w-full md:w-48">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between  px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700"
            >
              Download PDF
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isOpen && (
              <ul className="absolute w-full mt-2 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden z-10">
                {options.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      Drop(item);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trends */}
          <div className="bg-gray-800 p-6 rounded-lg lg:col-span-2 min-w-0">
            <h2 className="text-lg font-semibold mb-4">Revenue Trends</h2>
            <div className="w-full h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis
                    stroke="#ffffff"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders */}
          <div className="flex justify-around lg:block gap-3">
            <div className="bg-gray-800 p-6 rounded-lg w-[50vh] lg:w-full">
              <h2 className="text-lg font-semibold mb-4">Orders</h2>
              <ResponsiveContainer
                width="100%"
                height={160}
                className={"lg:h-[400px]"}
              >
                <BarChart data={orderDistribution}>
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Bar dataKey="order" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Order Distribution */}
            <div className="bg-gray-800 p-6  rounded-lg w-[50vh] lg:w-full lg:mt-2">
              <h2 className="text-lg font-semibold mb-4">Order Distribution</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={orderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {orderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Agent Deliveries + User List */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Agent Deliveries */}
          <div className="bg-gray-800 p-6 rounded-lg flex-1 min-w-0">
            <h2 className="text-lg font-semibold mb-4">Agent Deliveries</h2>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentDeliveries}>
                  <XAxis dataKey="agent" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deliveries" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User List */}
          <div className="bg-gray-800 p-6 rounded-lg flex-1 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">User List</h2>
            <table className="w-full text-sm md:text-base">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
