import React, { useEffect, useState } from "react";
import { getItems, AddToCart } from "../../api/user";
// import { Info } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import UserNavbar from "../../components/user/UserNavbar";
import UserFooter from "../../components/user/UserFooter";

type Category = "Men" | "Women" | "Kid" | "General";
// type Service = "wash" | "dryClean" | "iron";

interface Item {
  userId: string;
  id: number;
  name: string;
  price: string;
  quantity?: number;
  service?: string;
}

interface IPrice {
  dryClean: number;
  wash: number;
  iron: number;
}

interface IClothItem {
  service: string;
  _id: number;
  name: string;
  category: Category;
  icon: number[];
  prices: IPrice;
  createdAt: Date;
  updatedAt: Date;
}

const UserSelectCloths = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Men");
  const [items, setItems] = useState<IClothItem[]>([]);
  const [cart, setCart] = useState<Item[]>([]);
  const [service, setServices] = useState<string>("wash");
  const user = useSelector((state: RootState) => state.auth);
   const handleServiceClick = (services: string) => {
    toast.success(`${services} the cloths`);
    setServices(services);
  };
  const [selectedItems, setSelectedItems] = useState<{
    [key in Category]: number[];
  }>({
    Men: [],
    Women: [],
    Kid: [],
    General:[]
  });
  const navigate = useNavigate();

  const [itemQuantities, setItemQuantities] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
 
        setItems(
          Array.isArray(response?.data) ? (response?.data as IClothItem[]) : []
        );
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory
  );
  const addAllToCart = () => {
     const allSelectedItems = filteredItems.filter((_, index) =>
      selectedItems[selectedCategory].includes(index)
    );
     setCart((prevCart) => [
      ...prevCart,
      ...allSelectedItems.map((item,index) => ({
        userId: user.userInfo._id,
        id: item._id,
        name: item.name,
        price: `$${item.prices.wash}`,
        service: service,
        quantity: itemQuantities[item._id] || index,
      })),
    ]);
 
    setSelectedItems((prev) => ({
      ...prev,
      [selectedCategory]: [],
    }));
  };
   const handleQuantityChange = (itemId: number, value: number) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const addtocart = async () => {
    try {
      const response = await AddToCart(cart);
      if (typeof response?.data === "string") {
        toast.error(response?.data);
        return;
    }
      if (response?.data?.success) {
        toast.success("Add To Cart  successfully");
        navigate("/user/cart");
      } else {
        toast.error(response?.data?.message || "Failed to add agent");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <UserNavbar />

      <div className="container mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Select Clothes for Laundry
          </h1>

          <div className="flex justify-center items-center mb-6">
            {(["Men", "Women", "Kid" , "General"] as Category[]).map((category) => (
              <button
                key={category}
                className={`px-4 py-2 w-[100vh] mr-2 rounded-lg font-semibold ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="text-right py-4">
            <button
              onClick={addAllToCart}
              disabled={selectedItems[selectedCategory].length === 0}
              className={`py-3 px-10 rounded-lg font-semibold transition-colors ${
                selectedItems[selectedCategory].length > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Add Selected to Cart ({selectedItems[selectedCategory].length})
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center bg-gray-200 p-3 rounded-lg shadow-md border border-gray-300 font-bold text-gray-700">
              <div className="w-12 text-center">Select</div>

              <div className="flex-1 pl-3  text-left">Item</div>

              <div className="w-24 text-center">Price</div>

              <div className="w-28 text-center">Quantity</div>
            </div>

            {filteredItems.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-col bg-gray-100 p-3 rounded-lg shadow-md border border-gray-300"
              >
                <div className="flex items-center">
                  <div className="w-12 text-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                      checked={selectedItems[selectedCategory].includes(index)}
                      onChange={() =>
                        setSelectedItems((prev) => ({
                          ...prev,
                          [selectedCategory]: prev[selectedCategory].includes(
                            index
                          )
                            ? prev[selectedCategory].filter((i) => i !== index)
                            : [...prev[selectedCategory], index],
                        }))
                      }
                    />
                  </div>

                  <div className="flex-1 text-left text-lg font-medium text-gray-800">
                    {item.name}
                  </div>

                  <div className="w-24 text-center text-gray-600">{`$${item.prices.wash}`}</div>

                  <div className="w-28 text-center">
                    <input
                      type="number"
                      value={itemQuantities[item._id] || index}
                      min={1}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity) && newQuantity > 0) {
                          handleQuantityChange(item._id, newQuantity);
                        }
                      }}
                      className="w-16 text-center border rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="mt-2 text-center font-bold text-gray-700">
                  Services
                </div>

                <div className="mt-1 flex justify-evenly bg-gray-50 p-2 rounded-lg border-t border-gray-300">
                  <div
                    className={`flex flex-col items-center cursor-pointer ${
                      service === "wash" ? "text-red-800" : "text-gray-600"
                    }`}
                    onClick={() => handleServiceClick("wash")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        service === "wash" ? "text-blue-800" : "text-blue-600"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 9.75a7.5 7.5 0 0115 0v6a7.5 7.5 0 01-15 0v-6z"
                      />
                    </svg>
                    <span>Wash</span>
                  </div>

                  <div
                    className={`flex flex-col items-center cursor-pointer ${
                      service === "dryClean" ? "text-blue-800" : "text-gray-600"
                    }`}
                    onClick={() => handleServiceClick("dryClean")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        service === "dryClean"
                          ? "text-blue-800"
                          : "text-blue-600"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7.5V6a3 3 0 013-3h12a3 3 0 013 3v1.5M3 16.5v1.5a3 3 0 003 3h12a3 3 0 003-3v-1.5M3 12h18"
                      />
                    </svg>
                    <span>Dry Clean</span>
                  </div>

                  <div
                    className={`flex flex-col items-center cursor-pointer ${
                      service === "iron" ? "text-blue-800" : "text-gray-600"
                    }`}
                    onClick={() => handleServiceClick("iron")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        service === "iron" ? "text-blue-800" : "text-blue-600"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 12.75h7.5m-10.5 3h13.5M12 6.75h9m-9-3h6m-7.5 3A6.75 6.75 0 003 10.5v.75h18v-.75a6.75-6.75 0 00-6.75-6.75h-1.5z"
                      />
                    </svg>
                    <span>Ironing</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Cart</h2>

                <button
                  className="py-3 px-10 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ml-auto"
                  onClick={addtocart}
                >
                  Add to Cart
                </button>
              </div>

              <div className="border rounded p-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{item.name}</span>
                    <span>{item.service}</span>
                    <span>{item.price}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
                <div className="mt-4 font-bold border-t pt-2">
                  Total: $
                  {cart
                    .reduce(
                      (sum, item) =>
                        sum +
                        parseFloat(item.price.replace("$", "")) *
                          item.quantity!,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <UserFooter/>

    </div>
  );
};

export default UserSelectCloths;
