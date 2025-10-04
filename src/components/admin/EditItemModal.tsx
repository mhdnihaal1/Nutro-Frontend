import React, { FormEvent, useState } from "react";

interface IPrice {
  dryClean: number;
  wash: number;
  iron: number;
}

// interface IClothItem {
//   _id:string;
//   name: string;
//   category: string;
//   icon: number[];
//   prices: IPrice;
//   createdAt: Date;
//   updatedAt: Date;
// }
interface AddItemModalProps {
  iseditOpen: boolean;
  oneditClose: () => void;
  itemData: (agentData: {
    name: string;
    category: string;
    icon: number[];
    prices: IPrice;
  }) => void;
}

interface Errors {
  name?: string;
  category?: string;
  icon?: string;
  prices?: string;
}

const EditItemModal: React.FC<AddItemModalProps> = ({
  iseditOpen,
  oneditClose,
  itemData,
}) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [icon, setIcon] = useState<number[]>([]);
  const [prices, setPrices] = useState<IPrice>({
    dryClean: 0,
    wash: 0,
    iron: 0,
  });
  // const [error, setError] = useState<string | null>(null);
  // const [errors, setErrors] = useState<Errors>({});

  if (!iseditOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!name.trim()) newErrors.name = "Name is required";

    if (!category) {
      newErrors.category = "category is required";
    }
    if (!prices) {
      newErrors.prices = "prices is required";
    }

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("wrong");
      return;
    }

    await itemData({ name, category, icon, prices });
    setName("");
    setCategory("");
    setIcon([]);
    setPrices({ dryClean: 0, wash: 0, iron: 0 });
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Add New Items</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">
                category
              </label>
              <input
                type="text"
                name="category"
                required
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">icon</label>
              <input
                name="icon"
                type="number"
                required
                onChange={(e) => setIcon([...icon, Number(e.target.value)])}
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Prices</label>

              {/* Dry Clean */}
              <div className="flex items-center mb-2">
                <label className="w-24 text-gray-300 text-sm">Dry Clean</label>
                <input
                  type="number"
                  name="dryClean"
                  required
                  value={prices.dryClean}
                  onChange={(e) =>
                    setPrices({ ...prices, dryClean: Number(e.target.value) })
                  }
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Wash */}
              <div className="flex items-center mb-2">
                <label className="w-24 text-gray-300 text-sm">Wash</label>
                <input
                  type="number"
                  name="wash"
                  required
                  value={prices.wash}
                  onChange={(e) =>
                    setPrices({ ...prices, wash: Number(e.target.value) })
                  }
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Iron */}
              <div className="flex items-center">
                <label className="w-24 text-gray-300 text-sm">Iron</label>
                <input
                  type="number"
                  name="iron"
                  required
                  value={prices.iron}
                  onChange={(e) =>
                    setPrices({ ...prices, iron: Number(e.target.value) })
                  }
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={oneditClose}
                className="bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
