import React, { FormEvent, useEffect, useState } from "react";
import { getOffers, addOffer , deleteOffer , editOffer} from "../../api/admin";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AddOfferModal from "../../components/admin/AddOfferModal";
import EditOfferModal from "../../components/admin/EditOfferModal";

interface IOffer {
  _id: string;
  name: string;
  price: number;
  expirationDate: Date;
  isActive: boolean;

}

interface Errors {
  name?: string;
  price?: string;
  expirationDate?: string;
  isActive?: string;
}

const AdminOffers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);
  const [editId , setEditId] = useState('')

  const [offer, setOffer] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0); 
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const toggleModal = () => setIsModalOpen(!isModalOpen);


  const toggliseModal = () => {
    setIseditModalOpen(!iseditModalOpen);
  };
  const edittoggleModal = (_id:string) => {
    console.log(123)
    setIseditModalOpen(!iseditModalOpen);
    setEditId(_id)
  };


  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await getOffers();
        setOffer(Array.isArray(offers?.data) ? (offers?.data as IOffer[]) : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch offers");
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

 

  const handleSaveItem = async (offerData: {
    name: string;
    price: number;
    expirationDate: Date;
    isActive: boolean;
  }) => {
    try {

      
      const response = await addOffer(offerData);

      if (response?.data?.success) {
        toast.success("Offer added successfully");
        setOffer((prev) => [...prev, response?.data?.data]);
        setIsModalOpen(false);

      } else {
        setIsModalOpen(false);
        toast.error(response?.data?.message || "Failed to add offer");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEditItem = async (offerData: {
    name: string;
    price: number;
    expirationDate: Date;
    isActive: boolean;
  }) =>{

    try {
    
      const _id = editId;
      const { name, price, expirationDate, isActive } = offerData;
      const Datas = { _id,name, price, expirationDate, isActive  };

      const response = await editOffer(Datas);

      if (response?.data) {
        toast.success("Offer edited successfully");
        setOffer((prev) =>  prev.map((offer) =>(offer._id === editId ? response.data : offer)));
        setIseditModalOpen(false);

      } else {
        toast.error(response?.data?.message || "Failed to edit offer");
        setIseditModalOpen(false);

      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };


  const handleDelete = async (_id: string) => {
    try {
      console.log(_id)
      const res = await deleteOffer(_id); 
      if (res) {
        console.log(res)
        setOffer((prev) => prev.filter((mapItem) => mapItem._id !== _id));
        toast.success("Map deleted successfully.")

      } else {
        toast.error("Failed to delete map.")
      }
    } catch (error) {
      // console.error("Error deleting map:", error);
      toast.error("Something went wrong while deleting the map.")
    }
  };




  return (
    <div className="min-h-screen bg-black text-white flex">
    {/* Sidebar */}
    <AdminSideBar/>


    {/* Main Content */}
    <div className="flex-grow p-8 ml-64">
    <h1 className="text-3xl font-bold mb-8">Manage Offers</h1>

        {/* Add Offer Button */}
        <button
          onClick={toggleModal}
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
        >
          Add Offer
        </button>

        <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
           <h2 className="text-xl font-semibold">Offer Name</h2>
            <h2 className="text-xl font-semibold">Offer Price</h2>
            <h2 className="text-xl font-semibold">Expiration Date</h2>
            <h2 className="text-xl text-center font-semibold ">isActive</h2>
            <h2 className="text-xl text-center font-semibold mr-[10vh]">Action</h2>
          </div>

            {offer.length === 0 ? (
              <p className="text-gray-400">No offers available.</p>
            ) : (
              <ul className="space-y-4">
                {offer.map((offer) => (
                  <li
                    key={offer._id}
                    className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                    >
                    <p className="text-gray-400 w-40 truncate">{offer.name}</p>
                    <p className="text-gray-400 text-center w-80 truncate  ">{offer.price}</p>
                    <p className="text-blue-400 text-center w-32 text-center ml-[10vh] ">
                      {offer.expirationDate
                        ? new Date(offer.expirationDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="`px-3 py-1 text-center  ml-[25vh] rounded-lg text-sm font-semibold transition duration-300 ">
                      {offer.isActive ? "Active" : "Inactive"}
                    </p>
                    <button
                        onClick={() => handleDelete(offer?._id)}
                        className="px-3 text-center  py-1 bg-red-600 text-white ml-[20vh] rounded-lg text-sm font-semibold transition duration-300 hover:bg-red-700"
                      >
                      Delete
                    </button>
                    <button
                        onClick={() => edittoggleModal(offer?._id)}
                        className="px-3  text-center   py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-red-700"
                      >
                      Edit
                    </button>
                   
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>


      <EditOfferModal
        iseditOpen={iseditModalOpen}
        oneditClose={() => setIseditModalOpen(false)}
        offerData={handleEditItem}
      />

      <AddOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offerData={handleSaveItem}
      />

   
    </div>
  );
};

export default AdminOffers;
 