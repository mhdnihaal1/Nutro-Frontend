import React, { FormEvent, useState } from "react";

interface IMap {
  sl_no: string;
  place: string;
  pincode: string;
  latitude: string;
  longitude: string;
}
interface AddMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  mapData: (agentData: {
    sl_no: string;
    place: string;
    pincode: string;
    latitude: string;
    longitude: string;
  }) => void;
}
const AddMapModal: React.FC<AddMapModalProps> = ({
  isOpen,
  onClose,
  mapData,
}) => {
  const [sl_no, setSl_no] = useState("");
  const [place, setPlace] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  if (!isOpen) return null;

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await mapData({ sl_no, place, pincode, latitude, longitude });
    console.log("res",res)
    setSl_no("");
    setPlace("");
    setPincode("");
    setLatitude("");
    setLongitude("");
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Add New Map</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">sl_no</label>
              <input
                type="text"
                name="sl_no"
                required
                value={sl_no}
                onChange={(e) => setSl_no(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">place</label>
              <input
                type="text"
                name="place"
                required
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">
                pincode
              </label>
              <input
                type="text"
                name="pincode"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">
                Latitude & Longitude
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="latitude"
                  placeholder="Latitude"
                  required
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-1/2 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="number"
                  name="longitude"
                  placeholder="Longitude"
                  required
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-1/2 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMapModal;
