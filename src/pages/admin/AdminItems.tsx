import React,{FormEvent,useEffect,useState} from 'react'
import { getItems , addClothItem , deleteItem , editClothItem} from "../../api/admin";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminSideBar from "../../components/admin/AdminSideBar";
import AddItemModal from "../../components/admin/AddItemModal";
import EditItemModal from "../../components/admin/EditItemModal";


interface IPrice {
  dryClean: number;
  wash: number;
  iron: number;
}

interface IClothItem {
  _id:string;
  name: string;
  category: string;
  icon: number[];
  prices: IPrice;
  createdAt: Date;
  updatedAt: Date;
}

interface Errors {
  name?: string;
  category?: string;
  icon?:string;
  prices?: string;
}


const AdminItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);
  const [editId , setEditId] = useState('')

  const [clothItem, setClothItem] = useState<IClothItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
  const [errors, setErrors] = useState<Errors>({});

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const edittoggleModal = (_id:string) => {
    console.log(123)
    setIseditModalOpen(!iseditModalOpen);
    setEditId(_id)
  };

  useEffect(() => {

    const fetchAgents = async () => {
      try {
        const items = await getItems();
        // console.log("items",items?.data)
        setClothItem(Array.isArray(items?.data) ? (items?.data as IClothItem[]) : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch agents");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

 

  const handleSaveItem = async (itemData:{ 
    name: string;
    category: string;
    icon: number[];
    prices: IPrice;}) => {
    try {

      const response = await addClothItem(itemData)
      console.log("response",response)
      if (response?.data?.success) {
        toast.success("Item added successfully");
        setClothItem((prev) => [...prev, response.data.agent]);
        setIsModalOpen(false);

      } else {
        toast.error(response?.data?.data?.message || "Failed to add Item");
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEditItem = async(itemData:{ 
    name: string;
    category: string;
    icon: number[];
    prices: IPrice;}) => {
    try {
       const _id = editId;
       const { name, category, icon, prices } = itemData;
       const Datas = { _id,name, category, icon, prices  };
     

      const response = await editClothItem(Datas)

      if (response?.data) {
        toast.success("item edited successfully");
        setClothItem((prev) => prev.map((item) => (item._id === editId ? response.data : item)));
        setIseditModalOpen(false);

      } else {
        toast.error(response?.data?.message || "Failed to edited clothitems ");
        setIseditModalOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong on editing clothitem. Please try again.");
    }
  };
  


  const handleDelete = async (_id: string) => {
    try {
      // console.log(_id)
      const res = await deleteItem(_id); 
      if (res) {
        // console.log(res)
        setClothItem((prev) => prev.filter((Item) => Item._id !== _id));
        toast.success("Map deleted successfully.")

      } else {
        toast.error("Failed to delete map.")
      }
    } catch (error) {
      // console.error("Error deleting map:", error);
      toast.error("Something went wrong while deleting the item.")
    }
  };

  
 
 
    return (
      <div className="min-h-screen bg-black text-white flex">
        {/* Sidebar */}
        <AdminSideBar/>

  
        {/* Main Content */}
        <div className="flex-grow p-8 ml-64">
          <h1 className="text-3xl font-bold mb-8">Manage Items</h1>
  
          {/* Add Agent Button */}
          <button
            onClick={toggleModal}
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
          >
            Add Items
          </button>
  
          <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold ml-[4vh]">Name</h2>
            <h2 className="text-xl font-semibold">Category</h2>
            <h2 className="text-xl font-semibold">Icon</h2>
            <h2 className="text-xl font-semibold mr-[25vh]">Prices</h2>
            <h2 className="text-xl font-semibold mr-[15vh]">Action</h2>

          </div>

          <div>
            {clothItem.length === 0 ? (
              <p className="text-gray-400">No users available.</p>
            ) : (
              <ul className="space-y-4">
                {clothItem.map((item) => (
                  <li
                    key={item._id}
                    className="bg-gray-900 p-4 rounded-md flex justify-around items-center"
                  >
                    {/* Name and Email in a Row */}
                    <p className="text-gray-400 w-40 truncate">{item.name}</p>
                    <p className="text-gray-400 w-40 truncate">{item.category}</p>
                    <p className="text-gray-400 w-40 truncate pl-[10vh]">{item.icon}</p>
                    <div className="text-gray-400 w-40 truncate">
  {Object.entries(item.prices).map(([key, value]) => (
    <div key={key} className="flex justify-between border-b py-2">
      <span className="font-semibold text-gray-700">{key}</span>
      <span className="text-gray-600">{value ? value : ''}</span>
    </div>
  ))}
</div>
               <button
                        onClick={() => handleDelete(item?._id)}
                        className="px-3 text-center  py-1 bg-red-600 text-white ml-[25vh] rounded-lg text-sm font-semibold transition duration-300 hover:bg-red-700"
                      >
                      Delete
                    </button>
                    <button
                        onClick={() => edittoggleModal(item?._id)}
                        className="px-3    py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-red-700"
                      >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        </div>

  
        <EditItemModal
        iseditOpen={iseditModalOpen}
        oneditClose={() => setIseditModalOpen(false)}
        itemData={handleEditItem}
      />

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemData={handleSaveItem}
      />
    
      </div>
    );
  };

export default AdminItems
