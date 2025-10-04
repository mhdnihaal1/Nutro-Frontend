import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import AgentSideBar from "../../components/agent/AgentSideBar";

const Settings = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const agent = useSelector((state: RootState) => state.agentAuth);
  const Agent = agent?.agentInfo;

  useEffect(() => {
    if (!Agent) {
      navigate("/agent/login");
    }
  }, [Agent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col md:flex-row">
      <AgentSideBar />

      <div className="flex-grow p-6 md:p-10 md:ml-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ⚙️ Settings – Nutro Laundry Service
          </h1>

          <div className="bg-gray-900 bg-opacity-70 rounded-2xl shadow-xl border border-gray-700 p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              About Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At{" "}
              <span className="font-semibold text-white">
                Nutro Laundry Service
              </span>
              , we take pride in offering premium laundry solutions that combine
              efficiency, convenience, and sustainability. Our mission is to
              deliver top-quality laundry services while ensuring customer
              satisfaction at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "🧼 Dry Cleaning",
                desc: "Premium cleaning for delicate fabrics.",
              },
              {
                title: "👕 Wash & Fold",
                desc: "Hassle-free laundry service for daily wear.",
              },
              {
                title: "⚡ Express Service",
                desc: "Get your laundry done within hours.",
              },
              {
                title: "🌱 Eco-Friendly",
                desc: "Protecting your clothes and the planet.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl shadow-md border border-gray-700 p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 bg-opacity-70 rounded-2xl shadow-xl border border-gray-700 p-8 mb-10">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              🌟 Why Choose Nutro?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our advanced cleaning technology, skilled professionals, and
              commitment to hygiene ensure that your clothes receive the best
              possible care. We also provide convenient pickup and delivery
              services, so you never have to worry about laundry again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl shadow-md border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                📞 Customer Support
              </h3>
              <p className="text-gray-400">
                Need assistance? Our 24/7 customer support is always ready to
                help. Contact us via email, phone, or live chat for any queries
                regarding your orders, payments, or service requests.
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-md border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-pink-400 mb-2">
                🔒 Privacy & Security
              </h3>
              <p className="text-gray-400">
                At Nutro, we value your privacy. Our secure payment gateway and
                data protection policies ensure your personal and payment
                information always remains confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
