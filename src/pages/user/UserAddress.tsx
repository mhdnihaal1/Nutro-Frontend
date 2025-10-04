import React, { useEffect, useState } from "react";
// import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Using react-icons
import { Toaster, toast } from "react-hot-toast";
import { AddAddress } from "../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAddress, EditAddress, deleteAddress } from "../../api/user";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddAgentModal from "../../components/user/UserAddAddress";
import EditAgentModal from "../../components/user/UserEditAddress";

interface ShowAddress {
  _id: string;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

const AddressPage = () => {
  const [ids, setId] = useState("");
  const user = useSelector((state: RootState) => state.auth);
  const User = user?.userInfo?._id;

  const navigate = useNavigate();

  const [address, setAddress] = useState<ShowAddress[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getAddress(User);
        if (res?.data) {
          const address = res?.data?.addresses;

          setAddress(Array.isArray(address) ? (address as ShowAddress[]) : []);
        } else {
          console.warn("No address data gets");
        }
      } catch (error) {
        console.error("Failed to fetch address:", error);
      }
    };
    fetchAddress();
  }, []);

  const handleAddAddressClick = () => {
    setIsModalOpen(true);
  };
  const handleEditAddressClick = (_id: string) => {
    setId(_id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalOpen(false);
  };

  const handleAddNewAddress = async (addressData: {
    userId: string;
    nearBy: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
  }) => {
    try {
      const res = await AddAddress(addressData);

      if (res?.data?.addresses && typeof res?.data !== "string" ) {
        const address = res?.data?.addresses;
        toast.success("Address added successfully!");

        setAddress(Array.isArray(address) ? (address as ShowAddress[]) : []);

        handleCloseModal();
      }
      if (typeof res?.data === "string" ) {
        toast.error( res?.data);
    }
    } catch (error) {
      console.log(error);
      toast.error("Please fill in all fields!");
    }
  };

  const handleeditAddress = async (addressData: {
    userId: string;
    nearBy: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
  }) => {
    try {
      const { userId, nearBy, street, city, state, postalCode } = addressData;
      const data = {
        _id: ids,
        userId,
        nearBy,
        street,
        city,
        state,
        postalCode,
      };

      const res = await EditAddress(data);

      if (typeof res?.data === "string") {
        toast.error(res?.data);
        return;
    }

      if (res?.data) {
        setAddress((prevAddresses) =>
          prevAddresses.map((addr) =>
            addr._id === ids ? { ...addr, ...data } : addr
          )
        );

        setId("");
        handleCloseModal();
        toast.success("Address edited successfully!");
      }
    } catch (error) {
      console.error("Failed to edit address:", error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const res = await deleteAddress(_id, User);
      if (typeof res?.data === "string") {
        toast.error(res?.data);
        return;
    }
      if (res?.data) {
        const address = res?.data?.addresses;

        setAddress(Array.isArray(address) ? (address as ShowAddress[]) : []);
      } else {
        console.warn("No address data gets");
      }
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="container mx-auto px-6 py-16">
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="p-2   bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Your Addresses
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
            <span className="font-semibold text-gray-700">NearBy</span>
            <span className="font-semibold text-gray-700">
              street/work/house
            </span>
            <span className="font-semibold text-gray-700">Town/City</span>
            <span className="font-semibold text-gray-700">State</span>
            <span className="font-semibold text-gray-700">Pincode</span>
            <span className="font-semibold text-gray-700">Actions</span>
          </div>

          {address.length !== 0 ? (
            address.map((address) => (
              <div
                key={address._id}
                className="flex justify-between items-center p-4 border-b hover:bg-blue-50 transition-all"
              >
                <span className="text-lg text-gray-700">{address.nearBy}</span>
                <span className="text-lg text-gray-700">{address.street}</span>
                <span className="text-lg text-gray-700">{address.city}</span>
                <span className="text-lg text-gray-700">{address.state}</span>
                <span className="text-lg text-gray-700">
                  {address.postalCode}
                </span>
                <div className="">
                  <button
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    onClick={() => handleEditAddressClick(address._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    onClick={() => handleDelete(address._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center mt-10">Address is empty </h2>
          )}

          <button
            onClick={handleAddAddressClick}
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Add Address
          </button>
        </div>
      </div>

      <EditAgentModal
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
        addressData={handleeditAddress}
      />

      <AddAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addressData={handleAddNewAddress}
      />

      <Toaster position="top-center" />
    </div>
  );
};

export default AddressPage;
