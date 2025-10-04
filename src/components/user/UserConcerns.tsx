import React, { useState } from "react";

interface ConcernModalProps {
  isOpen: boolean;
  onClose: () => void;
  concern: (concern: { subject: string; summary: string }) => void;
}

const ConcernModal: React.FC<ConcernModalProps> = ({
  isOpen,
  onClose,
  concern,
}) => {
  const [subject, setSubject] = useState("");
  const [summary, setSummary] = useState("");

  if (!isOpen) return null;

  const concernOptions = [
    "Order Delaying",
    "Wrong Item Delivered",
    "Damaged Item",
    "Payment Issue",
    "Wrong service",
    "Agent misbehave",
    "Others",
  ];

  const submitHandler = async () => {
    await concern({ subject, summary });
    setSubject("");
    setSummary("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Submit Your Concern</h2>

        {/* Dropdown */}
        <select
          className="w-full p-2 border rounded-md mb-3"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select a concern...</option>
          {concernOptions.map((concern, index) => (
            <option key={index} value={concern}>
              {concern}
            </option>
          ))}
        </select>

        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          placeholder="Enter your concern..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        ></textarea>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              submitHandler();
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConcernModal;
