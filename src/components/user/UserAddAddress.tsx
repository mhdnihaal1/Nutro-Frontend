import React, { useState } from "react";
// import { getMaps } from "../../api/admin";
// import validator from "validator";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// interface Errors {
//   name?: string;
//   email?: string;
//   phone?: string;
//   password?: string;
// }
interface NewAddress {
  userId: string;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}
interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  addressData: (addressData: {
    userId: string;
    nearBy: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
  }) => void;
}

const AddAgentModal: React.FC<AddAgentModalProps> = ({
  isOpen,
  onClose,
  addressData,
}) => {
  const user = useSelector((state: RootState) => state.auth);
  const User = user?.userInfo?._id;
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const [newAddress, setNewAddress] = useState<NewAddress>({
    userId: User,
    nearBy: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  // const [errors, setErrors] = useState<Errors>({});

  if (!isOpen) return null;

  const submitHandler = async () => {
    // Trimmed values for validation
    const { nearBy, street, city, state, postalCode } = newAddress;

    // Validation checks
    if (!nearBy.trim()) {
      toast.error("Nearby location is required.");
      return;
    }
    if (!street.trim()) {
      toast.error("Street is required.");
      return;
    }
    if (!city.trim()) {
      toast.error("City is required.");
      return;
    }
    if (!state.trim()) {
      toast.error("State is required.");
      return;
    }
    if (!postalCode.trim()) {
      toast.error("Postal code is required.");
      return;
    }
    if (!/^\d{5,6}$/.test(postalCode)) {
      toast.error("Invalid postal code. Must be 5-6 digits.");
      return;
    }

    // Formatted address object
    const formattedAddress = {
      userId: User, // Ensure User is correctly set
      nearBy,
      street,
      city,
      state,
      postalCode,
    };

    try {
      await addressData(formattedAddress);
      toast.success("Address added successfully!");

      // Reset input fields
      setNewAddress({
        userId: "",
        nearBy: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
      });
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    }
  };

  return (
    <div>
      {/* Modal for Adding Address */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h3 className="text-2xl font-semibold mb-4">Add New Address</h3>
          {/* Address Input Fields */}
          <div className="mb-4">
            <label
              htmlFor="nearBy"
              className="block text-gray-700 font-semibold mb-2"
            >
              NearBy
            </label>
            <input
              id="nearBy"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter nearBy"
              value={newAddress.nearBy}
              onChange={(e) =>
                setNewAddress({ ...newAddress, nearBy: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-gray-700 font-semibold mb-2"
            >
              Street / House / Workplace
            </label>
            <input
              id="street"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter street, house or workplace"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-semibold mb-2"
            >
              City / Town
            </label>
            <input
              id="city"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter city or town"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 font-semibold mb-2"
            >
              State / Province
            </label>
            <input
              id="state"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter state or province"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="postalCode"
              className="block text-gray-700 font-semibold mb-2"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter postal code"
              value={newAddress.postalCode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, postalCode: e.target.value })
              }
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgentModal;
