import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import UserNavbar from "../../components/user/UserNavbar";
import UserFooter from "../../components/user/UserFooter";

const UserContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <UserNavbar />

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <p className="text-lg text-gray-600">
              Have any questions? Feel free to reach out to us!
            </p>
            <div>
              <p className="font-semibold text-gray-700">📍 Address:</p>
              <p className="text-gray-500">
                123 Clean Street, Laundry City, NY 10001
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">📞 Phone:</p>
              <p className="text-gray-500">(+1) 234-567-890</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">📧 Email:</p>
              <p className="text-gray-500">support@cleanprolaundry.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">🕒 Business Hours:</p>
              <p className="text-gray-500">Monday - Saturday: 9 AM - 8 PM</p>
              <p className="text-gray-500">Sunday: Closed</p>
            </div>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-lg w-200 items-center sm:w-100 md:w-[106vh] lg:w-[143vh] xl:w-[180vh] 2xl:w-[210vh]  mt-10 ml-2  shadow-lg overflow-hidden">
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.95373531590406!3d-37.81720997975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f6e75555%3A0x5045675218ce7e33!2sMelbourne%20VIC!5e0!3m2!1sen!2sau!4v1604541819170!5m2!1sen!2sau"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <UserFooter/>

    </div>
  );
};

export default UserContact;
