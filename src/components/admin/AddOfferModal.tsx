import React, { FormEvent, useState } from 'react'





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


interface AddOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
    offerData: (offerData: {
        name: string;
        price: number;
        expirationDate: Date;
        isActive: boolean;
    }) => void;
  }
const AddOfferModal: React.FC<AddOfferModalProps> = ({
    isOpen,
    onClose,
    offerData,
  }) => {

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0); 
    const [expirationDates, setExpirationDate] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});
    if (!isOpen) return null;

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
    
        if (!name.trim()) newErrors.name = "Name is required";
        if (!price || price <= 0) newErrors.price = "Valid price is required";
        if (!expirationDates) newErrors.expirationDate = "Expiration date is required";
        if (!isActive) newErrors.expirationDate = "isActive date is required";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        const expirationDate = new Date(expirationDates); // Convert string to Date

        await offerData({ name, price, expirationDate, isActive });
        setName("");
        setPrice(0);
        setExpirationDate("");
        setIsActive(false);
      };

  return (
    <div>
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Offer</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">
                  Offer name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">
                  Offer price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={expirationDates}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">
                  Active Status
                </label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
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

    </div>
  )
}

export default AddOfferModal
