import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  getAddress,
  getCart,
  getDeliveryMode,
  placeOrder,
} from "../../api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBolt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import GooglePayButton from "@google-pay/button-react";

interface CartItem {
  clothItemId: {
    _id: string;
    name: string;
    icon: string;
    prices: { DryClean: number; Ironing: number; Wash: number };
  }; // Added price
  clothItem: string;
  _id: string;
  name: string;
  service: "Wash" | "DryClean" | "Ironing";
  quantity: number;
}

interface Address {
  userId: string;
  nearBy: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface IDeliveryMode {
  mode: "default " | "express";
  rate: number;
}

// interface Order {
//   userId: string;
//   address: string;
//   totalPrice: number;
//   deliveryMode: string;
// }

const UserOrderConfirmation: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [mode, setMode] = useState<IDeliveryMode[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth);
  const userId = user.userInfo._id;
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedMode, setSelectedMode] = useState("default");
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  // const [order, setOrder] = useState<Order>({
  //   userId: userId,
  //   address: "",
  //   totalPrice: 0,
  //   deliveryMode: "",
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carts = await getCart(userId);
        const addresse = await getAddress(userId);
        const modes = await getDeliveryMode();
        if (carts?.data && modes?.data) {
          setCart(Array.isArray(carts?.data?.items) ? carts?.data?.items : []);
          setAddresses(
            Array.isArray(addresse?.data?.addresses)
              ? addresse?.data?.addresses
              : []
          );
          setMode(Array.isArray(modes?.data) ? modes?.data : []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  let cartTotal = cart.reduce(
    (total, item) =>
      total + item.clothItemId.prices[item.service] * item.quantity,
    0
  );
  let grandTotal =
    selectedMode === "default" ? cartTotal + 4.99 + 1 : cartTotal + 8.99 + 1;
  grandTotal = Number(grandTotal.toFixed(2));

  const setselectedAddress = async (index: any) => {
    setSelectedAddress(index);
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

  const PlaceOrder = async () => {
    try {
      const res = await placeOrder(
        userId,
        selectedAddress,
        grandTotal,
        selectedMode,
        paymentMethod
      );

      if (typeof res?.data === "string") {
        toast.error(res?.data);
        return;
      }

      if (res?.data?.status === "orderPlaced") {
        navigate("/user/orderplaced", { state: { orderData: res?.data } });

        toast.success("Order placed successfully!");
      } else {
        toast.error(res?.data || "Order placement failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getIcon = (mode: string) => {
    return mode === "default" ? (
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-blue-500 text-3xl"
      />
    ) : (
      <FontAwesomeIcon icon={faBolt} className="text-yellow-500 text-3xl" />
    );
  };

  const Payment = async (paymeth: string) => {
    if (paymeth === "COD") {
      setPaymentMethod(paymeth);
      toast.success("Payment method added!");
    } else {
      // Show only the selected payment method
      const selectedMethod = document.getElementById(paymeth);
      if (selectedMethod) {
        selectedMethod.classList.toggle("hidden");
      }
    }
  };

  const handleGooglePayClick = () => {
    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA", "AMEX", "DISCOVER"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example",
              gatewayMerchantId: "stripe_test_merchant",
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "98765432101234567890",
        merchantName: "Demo Merchant",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: grandTotal.toString(),
        currencyCode: "USD",
        countryCode: "US",
      },
      shippingAddressRequired: false,
      callbackIntents: ["PAYMENT_AUTHORIZATION"],
    };

    if (paymentDataRequest) {
      setPaymentMethod("GooglePay");
    }
  };

  const addres = () => {
    navigate("/user/address");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="">
        <button
          onClick={() => navigate(-1)}
          className="p-2   bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Order Confirmation
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Items Ordered
            </h3>
            <ul className="space-y-3">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                  >
                    <span className="font-medium text-gray-700">
                      {item.name} ({item.service} - {item.clothItemId.name})
                    </span>
                    <span className="font-semibold text-gray-800">
                      x{item.quantity} - $
                      {item.clothItemId.prices[item.service]
                        ? (
                            item.clothItemId.prices[item.service] *
                            item.quantity
                          ).toFixed(2)
                        : "N/A"}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No items in cart.</p>
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Delivery Addresses
            </h3>
            <div className="relative flex items-center justify-end">
              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute bottom-10 bg-gray-900 text-white text-xs px-3 py-1 rounded-md">
                  Add Address
                </div>
              )}

              <div
                className="w-7 h-7 bg-gray-800 rounded-full flex flex-col items-center justify-center space-y-1 cursor-pointer relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={addres}
              >
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            {addresses.length > 0 ? (
              <table className="w-full border-collapse border bg-gray-50 shadow-sm rounded-lg">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 text-left">Nearby</th>
                    <th className="py-2 px-4 text-left">Street</th>
                    <th className="py-2 px-4 text-left">City</th>
                    <th className="py-2 px-4 text-left">State</th>
                    <th className="py-2 px-4 text-left">Postal Code</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.map((addr, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{addr.nearBy}</td>
                      <td className="py-2 px-4">{addr.street}</td>
                      <td className="py-2 px-4">{addr.city}</td>
                      <td className="py-2 px-4">{addr.state}</td>
                      <td className="py-2 px-4">{addr.postalCode}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => setselectedAddress(index)}
                          className={`px-3 py-1 text-sm rounded-md transition-all ${
                            selectedAddress === index.toString()
                              ? "bg-green-600 text-white"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          {selectedAddress === index.toString()
                            ? "Selected"
                            : "Select"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No address found.</p>
            )}
          </div>

          <div className="flex justify-center">
            <table className="w-3/4 border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3">Select</th>
                  <th className="border border-gray-300 p-3">Delivery Mode</th>
                  <th className="border border-gray-300 p-3">Icon</th>
                  <th className="border border-gray-300 p-3">Rate</th>
                </tr>
              </thead>
              <tbody>
                {mode.map((modes) => (
                  <tr key={modes.mode} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-3 text-center">
                      <input
                        type="radio"
                        name="deliveryMode"
                        value={modes.mode}
                        checked={selectedMode === modes.mode}
                        onChange={() => setSelectedMode(modes.mode)}
                        className="h-5 w-5"
                      />
                    </td>
                    <td className="border border-gray-300 p-3 capitalize">
                      {modes.mode} Service
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {getIcon(modes.mode)}
                    </td>
                    <td className="border border-gray-300 p-3">
                      ₹{modes.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Coupon Code
            </h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Apply
              </button>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold text-black mb-3">
                Your Order
              </h2>
              <div className="p-5 border bg-white rounded-lg shadow-lg">
                <table className="w-full border-collapse mb-5">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Product</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formattedItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-2">
                          <strong className="mx-2">({item.service})</strong>x
                          {item.quantity}
                        </td>
                        <td className="text-right py-2">
                          $
                          {item.clothItemId.prices[item.service] *
                            item.quantity}
                        </td>
                      </tr>
                    ))}

                    <tr className="border-b font-semibold text-black">
                      <td className="py-2">other exp</td>
                      <td className="text-right py-2">${1.0}</td>
                    </tr>
                    <tr className="border-b font-semibold text-black">
                      <td className="py-2">Delivery exp</td>
                      <td className="text-right py-2">
                        ${selectedMode === "default" ? 4.99 : 8.99}
                      </td>
                    </tr>
                    <tr className="font-semibold text-black">
                      <td className="text-lg font-bold text-gray-700">
                        Grand Total:
                      </td>
                      <td className="text-right py-2  font-extrabold text-green-600">
                        ${grandTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center items-center m-4">
                  <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [
                        {
                          type: "CARD",
                          parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: [
                              "MASTERCARD",
                              "VISA",
                              "AMEX",
                              "DISCOVER",
                            ],
                          },
                          tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                              gateway: "example",
                              gatewayMerchantId: "stripe_test_merchant",
                            },
                          },
                        },
                      ],
                      merchantInfo: {
                        merchantId: "98765432101234567890",
                        merchantName: "Demo Merchant",
                      },
                      transactionInfo: {
                        totalPriceStatus: "FINAL",
                        totalPriceLabel: "Total",
                        totalPrice: grandTotal.toString(),
                        currencyCode: "USD",
                        countryCode: "US",
                      },
                      shippingAddressRequired: false,
                      callbackIntents: ["PAYMENT_AUTHORIZATION"],
                    }}
                    onClick={handleGooglePayClick} // Attaching the function here
                    onLoadPaymentData={(paymentRequest) => {
                     }}
                    onPaymentAuthorized={(paymentData) => {
                        return { transactionState: "SUCCESS" };
                    }}
                    existingPaymentMethodRequired={false}
                    buttonColor="black"
                    buttonType="buy"
                    className="rounded-lg shadow-md"
                  />
                </div>

                {[
                  { id: "GooglePay", title: "GooglePay" },
                  { id: "cheque", title: "Cheque Payment" },
                  { id: "COD", title: "COD" },
                ].map((payment) => (
                  <div key={payment.id} className="border p-3 mb-3 rounded-lg">
                    <h3 className="text-lg font-medium text-black">
                      <button
                        className="w-full text-left focus:outline-none"
                        onClick={() => Payment(payment.id)}
                      >
                        {payment.title}
                      </button>
                    </h3>
                    <div id={payment.id} className="hidden py-2 text-gray-600">
                      <p className="mb-0">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won’t be shipped until the funds have cleared in our
                        account.
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-5">
                  <button
                    className="w-full py-3 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800"
                    onClick={() => PlaceOrder()}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderConfirmation;
