import React from "react";

const UserSelectCloths = () => {
  const clothCategories = [
    { id: 1, name: "Shirts", description: "Select shirts for laundry" },
    { id: 2, name: "Pants", description: "Select pants for laundry" },
    { id: 3, name: "Dresses", description: "Select dresses for laundry" },
    { id: 4, name: "Towels", description: "Select towels for laundry" },
    { id: 5, name: "Bedding", description: "Select bedding items for laundry" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Select Clothes for Laundry
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Choose the type of clothes you’d like us to handle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clothCategories.map((cloth) => (
            <div
              key={cloth.id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm border hover:shadow-lg transition-shadow cursor-pointer text-center"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {cloth.name}
              </h3>
              <p className="text-gray-600 text-sm">{cloth.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelectCloths;
