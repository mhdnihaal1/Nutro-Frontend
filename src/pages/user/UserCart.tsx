import React, { useEffect, useState } from "react";
import { getCart, deleteCartItem, quantityChange } from "../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-hot-toast";
import { Plus, Minus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface CartItem {
  clothItemId: {
    _id: string;
    name: string;
    category: string;
    icon: string;
    prices: { dryClean: number; iron: number; wash: number };
  };
  clothItem: string;
  _id: string;
  name: string;
  service: "wash" | "dryClean" | "iron";
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const user = useSelector((state: RootState) => state.auth);
  const User = user.userInfo._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart(User);

        if (res?.data?.items) {
          const items = res?.data?.items;

          setCart(Array.isArray(items) ? (items as CartItem[]) : []);
        } else {
          console.warn("No cart data gets");
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, []);

  const groupItemsByService = (cart: CartItem[]) => {
    const washItems = cart.filter((item) => item.service === "wash");
    const dryCleanItems = cart.filter((item) => item.service === "dryClean");
    const ironingItems = cart.filter((item) => item.service === "iron");
    return { washItems, dryCleanItems, ironingItems };
  };
  const { washItems, dryCleanItems, ironingItems } = groupItemsByService(cart);

  const calculateCategoryTotal = (cart: CartItem[]) => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity * item.clothItemId.prices[item.service],
      0
    );
  };

  const groupCartItems = (cart: any[]) => {
    return cart.reduce((acc: Record<string, any>, item: any) => {
      if (!item.clothItemId || !item.clothItemId.prices) return acc;

      if (!acc[item.service]) {
        acc[item.service] = {
          ...item,
          quantity: 0,
          total: 0,
        };
      }

      acc[item.service].quantity += item.quantity;
      acc[item.service].total +=
        (item.clothItemId.prices[item.service] || 0) * item.quantity;

      return acc;
    }, {});
  };
  const groupedItems = groupCartItems(cart);
  const formattedItems = Object.values(groupedItems);

  const grandTotal =
    calculateCategoryTotal(washItems) +
    calculateCategoryTotal(dryCleanItems) +
    calculateCategoryTotal(ironingItems) +
    1;

  const handleDelete = async (cartItemId: string) => {
    try {
      let res = await deleteCartItem(cartItemId, User);

      if (typeof res?.data === "string") {
        toast.error(res?.data);
        return;
      }

      if (res?.data?.items) {
        const items = res?.data?.items;
        setCart(Array.isArray(items) ? (items as CartItem[]) : []);
      } else {
        console.warn("No updated cart data received from API");
      }
      toast.success("delete CartItem successfully");
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const handleQuantityChange = async (cartItemId: string, action: string) => {
    try {
      let res = await quantityChange(cartItemId, action, User);

      if (typeof res?.data === "string") {
        toast.error(res?.data);
        return;
      }

      if (res?.data?.items) {
        const items = res?.data?.items;
        setCart(Array.isArray(items) ? (items as CartItem[]) : []);
      } else {
        console.warn("No updated cart data received from API");
      }
      toast.success("quantityChange CartItem successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    try {
      const cartlength = cart.length;

      if (cartlength) {
        navigate("/user/checkout");
      } else {
        toast.error("Cart is Empty");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 flex space-x-6">
      <div className="flex-2 w-2/3">
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="p-2   bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-4xl pl-[40vh] font-semibold text-center text-gray-900 mb-8">
          Your Cart
        </h1>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Wash Items</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Cloth Icon</th>
                <th className="py-3 px-4 text-left">Cloth Item</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {washItems.map((item) => (
                <tr key={item.clothItemId._id || uuidv4()} className="border-b">
                  <>
                    <td className="py-3 px-4">{item?.clothItemId?.icon}</td>
                    <td className="py-3 px-4">
                      {item?.clothItemId?.name}({item?.clothItemId?.category})
                    </td>
                    <td className="py-3 px-4 flex items-center space-x-2">
                      <button
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item?._id, "decrement")
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item?._id, "increment")
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </td>{" "}
                    <td className="py-3 px-4">
                      <button
                        className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                        onClick={() => handleDelete(item?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Dry Clean Items
          </h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Cloth Icon</th>
                <th className="py-3 px-4 text-left">Cloth Item</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dryCleanItems.map((item) => (
                <tr key={item.clothItemId._id || uuidv4()} className="border-b">
                  <>
                    <td className="py-3 px-4">{item?.clothItemId?.icon}</td>
                    <td className="py-3 px-4">{item?.clothItemId?.name}</td>
                    <td className="py-3 px-4 flex items-center space-x-2">
                      <button
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item?._id, "decrement")
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item?._id, "increment")
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </td>{" "}
                    <td className="py-3 px-4">
                      <button
                        className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                        onClick={() => handleDelete(item?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ironing Items
          </h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Cloth Icon</th>
                <th className="py-3 px-4 text-left">Cloth Item</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ironingItems.map((item) => (
                <tr key={item.clothItemId._id || uuidv4()} className="border-b">
                  <>
                    <td className="py-3 px-4">{item?.clothItemId?.icon}</td>
                    <td className="py-3 px-4">{item?.clothItemId?.name}</td>
                    <td className="py-3 px-4 flex items-center space-x-2">
                      <button
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item?._id, "decrement")
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item?._id, "increment")
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                        onClick={() => handleDelete(item?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {washItems.length === 0 &&
          dryCleanItems.length === 0 &&
          ironingItems.length === 0 && (
            <div className="mt-6 text-center text-gray-600">
              <p>Your cart is empty.</p>
            </div>
          )}
      </div>

      <div className="w-1/3  mt-40">
        <div className="  p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Price Summary
          </h2>

          <table className="w-full border-collapse mb-5">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 ">Product</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {formattedItems.map((item: any) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2">
                    <strong className="mx-2">({item.service})</strong> x
                    {item.quantity}
                  </td>
                  <td className="text-right py-2">
                    ${item.clothItemId.prices[item.service] * item.quantity}
                  </td>
                </tr>
              ))}
              {cart.length > 0 ? (
                <tr className="border-b font-semibold text-black">
                  <td className="py-2">other exp</td>
                  <td className="text-right py-2">${1.0}</td>
                </tr>
              ) : (
                <></>
              )}

              <tr className="font-semibold text-black">
                <td className="py-2">Order Total</td>
                <td className="text-right py-2">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <hr className="my-4 border-t border-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-700">
              Grand Total:
            </span>
            <span className="text-xl font-extrabold text-green-600">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
          <button
            className="py-3 px-10 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ml-auto"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
