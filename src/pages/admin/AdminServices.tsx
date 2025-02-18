import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from "../../redux/slices/adminSlice";
import AdminSideBar from "../../components/admin/AdminSideBar";


const AdminServices = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [service, setService] = useState([
      { id: 1, name: "Service A", email: "ServiceA@example.com" , mobile: 3423233423 },
      { id: 2, name: "Service B", email: "ServiceB@example.com" , mobile: 3423233423 },
    ]);
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    const handleAddAgent = (event: React.FormEvent) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
  
      const name = formData.get("name") as string | null;
      const email = formData.get("email") as string | null;
      const mobile = formData.get("email") as number | null;
      if (name && email && mobile)   {
        const newService = {
          id: service.length + 1,
          name: name,
          email: email,
          mobile:mobile
        };
  
        setService([...service, newService]);
        toggleModal();
      } else {
        alert("Please fill in all fields.");
      }
    };

  
    return (
      <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <AdminSideBar/>


      {/* Main Content */}
      <div className="flex-grow p-8 ml-64">
      <h1 className="text-3xl font-bold mb-8">Manage Services</h1>
  
          {/* Add Agent Button */}
          <button
            onClick={toggleModal}
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
          >
            Add Service
          </button>
  
          {/* Agents List */}
          <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold">Service Name</h2>
            <h2 className="text-xl font-semibold">Description</h2>
            <h2 className="text-xl font-semibold">Features</h2>
          </div>

          <div>
            {service.length === 0 ? (
              <p className="text-gray-400">No users available.</p>
            ) : (
              <ul className="space-y-4">
                {service.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                  >
                    {/* Name and Email in a Row */}
                    <p className="text-gray-400 w-40 truncate">{service.name}</p>
                    <p className="text-gray-400 w-40 truncate ml-[55vh]">{service.email}</p>
                    <p className="text-gray-400 w-40 truncate ml-[40vh]">{service.mobile}</p>

                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        </div>
  
        {/* Add Agent Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New service</h2>
              <form onSubmit={handleAddAgent}>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Service Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Description</label>
                  <input
                    type="text"
                    name="description"
                    required
                    className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Key Features</label>
                  <input
                    type="text"
                    name="features"
                    required
                    className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

export default AdminServices
