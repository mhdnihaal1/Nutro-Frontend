import React, { useEffect, useState } from "react";
import { RootState } from "redux/store";
import { useNavigate } from "react-router-dom";
import { agentLogout } from "../../redux/slices/agentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMapData  } from "api/agent";
import AgentSideBar from "../../components/agent/AgentSideBar";


interface Map   {
      sl_no:number;
      place: string; 
      pincode:number;
      latitude_longitude: [number, number]; 

    }

const AgentProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
     const Agent = useSelector((state: RootState) => state.agentAuth?.agentInfo?._id);
     const [mapData , setMapData ] = useState<Map | null>(null)
     console.log(mapData)

    useEffect(() => {
        if (!Agent) {
          navigate("/agent/login");
        }
    
        const fetchCart = async () => {
            try {
              const res = await getMapData(Agent);
              console.log(res)
                  if (res?.data) {
                      const map = res?.data?.map;  
                      console.log(true,map)
      
                      setMapData(map as Map);
                  }else {
                      console.warn("No agent data gets");
                    }
            } catch (error) {
              console.error("Failed to fetch agent:", error);
            }
          };
          fetchCart();
      }, [Agent]);


  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col md:flex-row">
   <AgentSideBar />

   <div className="flex-grow p-4 md:p-8 md:ml-64 flex justify-center items-center">
    <div className="w-full max-w-5xl">
       <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
        🌍 Agent Map
      </h1>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-gray-900 bg-opacity-70  rounded-2xl p-6 border border-gray-700 shadow-2xl flex flex-col justify-center items-center">
          <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center text-gray-400 text-lg">
            🗺️ Map Preview Placeholder
          </div>
          <p className="mt-4 text-sm text-gray-400 text-center">
            (Map visualization will appear here)
          </p>
        </div>

        {/* Map Details */}
        <div className="bg-gray-900 bg-opacity-70   rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-3">
            📍 Map Details
          </h2>
          {mapData ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
              <div className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
                <p className="text-sm text-gray-400">Sl No</p>
                <p className="text-lg font-semibold">{mapData.sl_no || "N/A"}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
                <p className="text-sm text-gray-400">Place</p>
                <p className="text-lg font-semibold">{mapData.place || "N/A"}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
                <p className="text-sm text-gray-400">Pincode</p>
                <p className="text-lg font-semibold">{mapData.pincode || "N/A"}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
                <p className="text-sm text-gray-400">Latitude & Longitude</p>
                <p className="text-lg font-semibold">
                  {mapData.latitude_longitude || "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-lg text-red-500 mt-6 text-center">
              No agent map details available.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};


export default AgentProfile;
