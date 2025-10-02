import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
// import { agentLogout } from "../../redux/slices/agentSlice";
// import { adminLogout } from "../../redux/slices/adminSlice";
import AdminSideBar from "../../components/admin/AdminSideBar";

const Settings = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const admin = useSelector((state: RootState) => state.adminAuth);

  useEffect(() => {
    if (!admin) {
      navigate("/agent/login");
    }
  }, [admin, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-grow p-4 sm:p-6 lg:p-8 md:ml-64">
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          {/* Intro Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">
              Nutro Laundry Service
            </h2>
            <p className="text-gray-400 leading-relaxed">
              At Nutro Laundry Service, we take pride in offering premium
              laundry solutions that combine efficiency, convenience, and
              sustainability. Our mission is to deliver top-quality laundry
              services while ensuring customer satisfaction at every step. With
              our state-of-the-art technology and professional cleaning
              techniques, we handle your garments with the utmost care.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Our Services
            </h3>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Dry Cleaning - Premium cleaning for delicate fabrics.</li>
              <li>Wash & Fold - Hassle-free laundry service for daily wear.</li>
              <li>Express Service - Get your laundry done within hours.</li>
              <li>
                Eco-Friendly Detergents - Protecting your clothes and the
                planet.
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Why Choose Nutro?
            </h3>
            <p className="text-gray-400">
              Our advanced cleaning technology, skilled professionals, and
              commitment to hygiene ensure that your clothes receive the best
              possible care. We provide convenient pickup and delivery services,
              ensuring that you never have to worry about your laundry again.
            </p>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Customer Support
            </h3>
            <p className="text-gray-400">
              Need assistance? Our 24/7 customer support is always ready to
              help. Contact us via email, phone, or live chat for any queries
              regarding your orders, payments, or service requests.
            </p>
          </div>

          {/* Privacy */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Privacy & Security
            </h3>
            <p className="text-gray-400">
              At Nutro, we value your privacy. Our secure payment gateway and
              data protection policies ensure that your personal and payment
              information remains confidential at all times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
