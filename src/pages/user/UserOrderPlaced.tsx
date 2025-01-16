import React from "react";
import { CheckCircle } from "lucide-react";

const UserOrderPlaced = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for choosing our service! Your laundry order has been
          successfully placed. We’ll notify you once your items are ready.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md border text-left">
            <p className="text-gray-500 text-sm">Order ID:</p>
            <p className="text-gray-800 font-semibold">#12345ABC</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md border text-left">
            <p className="text-gray-500 text-sm">Pickup Date:</p>
            <p className="text-gray-800 font-semibold">January 15, 2025</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md border text-left">
            <p className="text-gray-500 text-sm">Delivery Date:</p>
            <p className="text-gray-800 font-semibold">January 20, 2025</p>
          </div>
        </div>

        <div className="mt-8">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Track Your Order
          </button>
        </div>

        <div className="mt-4">
          <button className="text-blue-600 underline font-semibold hover:text-blue-700 transition-colors">
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderPlaced;
