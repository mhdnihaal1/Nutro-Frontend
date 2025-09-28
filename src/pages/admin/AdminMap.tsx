import React, { useEffect, useState } from "react";
import { addMap, getMaps, deleteMap, editMap } from "../../api/admin";
import { Toaster, toast } from "react-hot-toast";
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

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    console.log(123);
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
    console.log(123)
    const { sl_no, place, pincode, latitude, longitude } = mapData;
    const Datas = {
      sl_no,
      place,
      pincode,
      latitude_longitude: [Number(latitude), Number(longitude)],
    } as IMap;
    console.log("Datas",Datas,typeof sl_no ,typeof place ,typeof pincode)
    if (sl_no || place || pincode) {
      try {
        const res = await addMap(Datas);
        console.log("res1",res)

        const map = res?.data?.data?.data;
        console.log("map",map)
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

      <div className="flex-grow p-8 sm:p-6 lg:p-8 md:ml-64">
        <h1 className="text-3xl font-bold mb-8">Manage Map</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8"
        >
          Add Map
        </button>

        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-xl font-semibold">sl_no</h2>
            <h2 className="text-xl font-semibold">place</h2>
            <h2 className="text-xl font-semibold">pincode</h2>
            <h2 className="text-xl font-semibold">latitude_longitude</h2>
            <h2 className="text-xl font-semibold mr-[13vh]">Actions</h2>
          </div>

          <div>
            {map.length === 0 ? (
              <p className="text-gray-400">No users available.</p>
            ) : (
              <ul className="space-y-4">
                {map.map((map, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                  >
                    <p className="text-gray-400 w-40 truncate">{map?.sl_no}</p>
                    <p className="text-gray-400 w-32 text-center ml-[10vh]">
                      {map?.place}
                    </p>
                    <p className="text-blue-400 w-32 text-center ml-[16vh] ">
                      {map?.pincode}
                    </p>
                    <p className="text-blue-400 w-32 text-center ml-[15vh]">
                      {map?.latitude_longitude}
                    </p>
                    <button
                      onClick={() => handleDelete(map?._id)}
                      className="px-3 py-1 bg-red-600 text-white ml-[25vh] rounded-lg text-sm font-semibold transition duration-300 hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => edittoggleModal(map?._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold transition duration-300 hover:bg-red-700"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

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
