import React from "react";
import { Check, MapPin, CalendarDays, Shirt } from "lucide-react";

const UserOrderConfirmation = () => {
  const orderDetails = {
    orderId: "#98765XYZ",
    pickupDate: "January 16, 2025",
    deliveryDate: "January 22, 2025",
    items: [
      { name: "Shirts", quantity: 5 },
      { name: "Pants", quantity: 3 },
      { name: "Dresses", quantity: 2 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Order Confirmation
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please review your order details before proceeding.
        </p>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md border text-left">
            <p className="text-gray-500 text-sm">Order ID:</p>
            <p className="text-gray-800 font-semibold">{orderDetails.orderId}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md border text-left">
            <p className="text-gray-500 text-sm">Pickup Date:</p>
            <p className="text-gray-800 font-semibold">
              {orderDetails.pickupDate}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md border text-left">
            <p className="text-gray-500 text-sm">Delivery Date:</p> 
            <p className="text-gray-800 font-semibold">
              {orderDetails.deliveryDate}
            </p>
          </div>
        </div>

        {/* Items List */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Items:</h2>
          <ul className="space-y-2">
            {orderDetails.items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-blue-50 p-3 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-800">
                    {item.name}
                  </span>
                </div>
                <span className="text-gray-600">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col space-y-4">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Confirm Order
          </button>
          <button className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Edit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderConfirmation;
