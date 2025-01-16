import React from "react";
import { CalendarDays, Clock, Shirt, Package, MapPin } from "lucide-react";
import Card from '../../components/user/Card';

const UserHome = () => {
  const services = [
    { icon: <Shirt className="w-6 h-6" />, title: "Wash & Fold", price: "From $2.99/lb" },
    { icon: <Package className="w-6 h-6" />, title: "Dry Cleaning", price: "From $5.99/item" },
    { icon: <Clock className="w-6 h-6" />, title: "Express Service", price: "24h Turnaround" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Fresh & Clean Laundry</h1>
          <p className="text-xl mb-8">Professional laundry service at your doorstep</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Schedule Pickup
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card
              key={index}
              className="hover:shadow-lg transition-shadow"
              title={service.title}
              description={service.price}
          >
          <div className="bg-blue-100 p-3 rounded-full">{service.icon}</div>
          </Card>
        ))}

        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">1. Schedule</h3>
              <p className="text-gray-600">Book a pickup time that works for you</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">2. Pickup</h3>
              <p className="text-gray-600">We collect your clothes from your doorstep</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">3. Delivery</h3>
              <p className="text-gray-600">Clean clothes delivered back to you</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-8">Experience the convenience of our laundry service today</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default UserHome;
