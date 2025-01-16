// import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
import AgentRoutes from './AgentRoutes';


const AllRouter = () => {
    return (
    // <BrowserRouter>
        <Routes>
            <Route path="/user/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/agent/*" element={<AgentRoutes />} />
        </Routes>
    //  </BrowserRouter>
    );
}

export default AllRouter;
