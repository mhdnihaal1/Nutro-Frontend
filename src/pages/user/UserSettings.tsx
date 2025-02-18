import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="p-2 mr-[270vh] bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">Privacy & Policy</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">1. Information We Collect</h2>
        <p className="text-gray-700">
          We collect personal details such as name, phone number, and email when
          you sign up. Additionally, we store order history and preferences for
          better service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700">
          We use your data to process laundry orders, provide customer support,
          and improve our services. Your information is never sold to third
          parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">3. Security & Data Protection</h2>
        <p className="text-gray-700">
          We implement strict security measures to protect your data. Our
          servers use encryption and secure protocols to safeguard your
          information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">4. Your Rights & Choices</h2>
        <p className="text-gray-700">
          You can update your data, request deletion, or opt out of promotional
          messages anytime by contacting our support team.
        </p>
      </section>

      <p className="text-sm text-gray-600 text-center">
        Last updated: February 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
