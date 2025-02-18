import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { agentLogout } from "../../redux/slices/agentSlice";

const AgentSideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const ToNewPage = () => {
        console.log('you will go to accept soon')
        navigate(`/agent/newOrders`);
       }
    
      const ToAcceptPage = () => {
        console.log('you will go to accept soon')
        navigate(`/agent/AcceptedOrders`);
       }
    
       const ToHistoryPage = () => {
        console.log('you will go to accept soon')
        navigate(`/agent/orderHistory`);
       }
    
       const profile = () => {
        navigate(`/agent/profile`);
       }
       const changePassword = () => {
        navigate(`/agent/changePassword`);
       }
       const map = () => {
        navigate(`/agent/map`);
       }
       const settings = () => {
        navigate(`/agent/settings`);
       }
       
       const logout = async () => {
        console.log(123)
        dispatch(agentLogout());
    navigate("/agent/login");
      
    }
  return (
    <div>
        <aside className="w-64 h-full bg-gray-900 text-gray-300 flex flex-col fixed">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className=" mt-10 p-4 space-y-4">
        <a
            //   href="newOrders"
            onClick={ToNewPage}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              New orders
            </a>
            <a
              // href="acceptedOrders"
              onClick={ToAcceptPage}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
             Accepted orders
            </a>
            <a
              // href="orderHistory"
              onClick={ToHistoryPage}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Order history
            </a>
            <a
               //   href="profile"
            onClick={profile}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
           My profile
          </a>
          <a
          //   href="changePassword"
          onClick={changePassword}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Change password
          </a>
          <a
          //   href="map"
          onClick={map}
            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Assigned map
          </a>

          
       
          <a
          //   href="settings"
          onClick={settings}
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Settings
            </a>
        </nav>
        <div className="p-4 border-t pt-20 mt-20 border-gray-700">
          <button onClick={logout} className="w-full bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default AgentSideBar
