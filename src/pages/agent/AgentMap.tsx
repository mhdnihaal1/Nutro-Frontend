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
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <AgentSideBar/>  

  
      {/* Profile Content */}

<div className="flex-grow p-8 ml-64 flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">

      <div className="w-full max-w-3xl bg-gray-900 bg-opacity-75 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700">
      <h1 className="text-4xl text-center font-extrabold text-white mb-8">Agent Map</h1>
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-200 border-b border-gray-700 pb-2">Map Details</h2>
        {mapData ? (
          <div className="mt-6 space-y-4 text-gray-300">
            <p className="text-lg"><strong className="text-gray-400">Sl No:</strong> {mapData.sl_no || "N/A"}</p>
            <p className="text-lg"><strong className="text-gray-400">Place:</strong> {mapData.place || "N/A"}</p>
            <p className="text-lg"><strong className="text-gray-400">Pincode:</strong> {mapData.pincode || "N/A"}</p>
            <p className="text-lg"><strong className="text-gray-400">Latitude & Longitude:</strong> {mapData.latitude_longitude || "N/A"}</p>
          </div>
        ) : (
          <p className="text-lg text-red-500 mt-4 text-center">No agent details available.</p>
        )}
       
      </div>
    </div>
    </div>
    </div>

  );
};


export default AgentProfile;
