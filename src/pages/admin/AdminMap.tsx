import React, { useEffect, useState } from "react";
import { addMap, getMaps, deleteMap, editMap } from "../../api/admin";
import { toast } from "react-hot-toast";
import AdminSideBar from "../../components/admin/AdminSideBar";
import EditMapModal from "../../components/admin/EditMapModal";
import AddMapModal from "../../components/admin/AddMapModal";

interface IMap {
  _id: string;
  sl_no: string;
  place: string;
  pincode: string;
  latitude_longitude: [number, number];
}

const AdminAgents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIseditModalOpen] = useState(false);

  const [map, setMap] = useState<IMap[]>([]);
  const [editId, setEditId] = useState("");

  const [, setError] = useState<string | null>(null);
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const maps = await getMaps();
        setMap(Array.isArray(maps?.data) ? (maps?.data as IMap[]) : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch maps");
        setLoading(false);
      }
    };
    fetchMaps();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const edittoggleModal = (_id: string) => {
    setIseditModalOpen(!iseditModalOpen);
    setEditId(_id);
  };

  const handleSaveMap = async (mapData: {
    sl_no: string;
    place: string;
    pincode: string;
    latitude: string;
    longitude: string;
  }) => {
    const { sl_no, place, pincode, latitude, longitude } = mapData;
    const Datas = {
      sl_no,
      place,
      pincode,
      latitude_longitude: [Number(latitude), Number(longitude)],
    } as IMap;
    if (sl_no || place || pincode) {
      try {
        const res = await addMap(Datas);

        const map = res?.data?.data?.data;
        if (res?.data?.success) {
          setMap((prev) => [...prev, map]);
          setIsModalOpen(false);
        } else {
          console.error("Failed to add map.");
          setIsModalOpen(false);
          toast.error("Map already exists.");
        }
      } catch (error) {
        console.error("Error adding map:", error);
        toast.error("Something went wrong while adding the map.");
      }
    } else {
      toast.error("Please fill in all fields with valid values..");
    }
  };

  const handleEditMap = async (mapData: {
    sl_no: string;
    place: string;
    pincode: string;
    latitude: string;
    longitude: string;
  }) => {
    try {
      const _id = editId;
      const { sl_no, place, pincode, latitude, longitude } = mapData;
      const Datas = {
        _id,
        sl_no,
        place,
        pincode,
        latitude_longitude: [Number(latitude), Number(longitude)],
      } as IMap;
      if (!sl_no || !place || !pincode) {
        toast.error("All fields are required.");
        return;
      }
      const res = await editMap(Datas);
      if (res?.data) {
        toast.success("Map edited successfully.");
        setMap((prev) =>
          prev.map((item) => (item._id === editId ? res.data : item))
        );
        setIseditModalOpen(false);
      } else {
        toast.error("Failed to edit map.");
        setIseditModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong while editing the map.");
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const res = await deleteMap(_id);
      if (res) {
        setMap((prev) => prev.filter((mapItem) => mapItem._id !== _id));
        toast.success("Map deleted successfully.");
      } else {
        toast.error("Failed to delete map.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the map.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <AdminSideBar />

      <div className="flex-grow p-6 md:ml-64">
        <h1 className="text-3xl font-bold mb-8">Manage Map</h1>

        {/* Add Map Button */}
        <button
          onClick={toggleModal}
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
        >
          Add Map
        </button>

        {/* Table Header (Desktop Only) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-center">SL No</h2>
          <h2 className="text-xl font-semibold text-center">Place</h2>
          <h2 className="text-xl font-semibold text-center">Pincode</h2>
          <h2 className="text-xl font-semibold text-center">
            Latitude / Longitude
          </h2>
          <h2 className="text-xl font-semibold text-center">Actions</h2>
        </div>

        {/* Table Rows */}
        <div>
          {map.length === 0 ? (
            <p className="text-gray-400">No maps available.</p>
          ) : (
            <ul className="space-y-4">
              {map.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-5 gap-4 items-center text-center">
                    <p className="text-gray-400">{item?.sl_no}</p>
                    <p className="text-gray-400">{item?.place}</p>
                    <p className="text-blue-400">{item?.pincode}</p>
                    <p className="text-blue-400">{item?.latitude_longitude}</p>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-semibold transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => edittoggleModal(item?._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="font-semibold">SL No:</span>{" "}
                      {item?.sl_no || "N/A"}
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Place:</span>{" "}
                      {item?.place || "N/A"}
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Pincode:</span>
                      <span className="text-blue-400">
                        {item?.pincode || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Lat / Long:</span>
                      <span className="text-blue-400">
                        {item?.latitude_longitude || "N/A"}
                      </span>
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="flex-1 px-3 py-1 rounded-lg text-sm font-semibold transition duration-300 bg-red-600 hover:bg-red-500 text-white "
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => edittoggleModal(item?._id)}
                        className="flex-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modals */}
      <EditMapModal
        iseditOpen={iseditModalOpen}
        oneditClose={() => setIseditModalOpen(false)}
        mapData={handleEditMap}
      />

      <AddMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mapData={handleSaveMap}
      />
    </div>
  );
};

export default AdminAgents;
