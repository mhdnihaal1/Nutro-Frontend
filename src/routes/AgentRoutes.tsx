// import React from "react"
import { Suspense ,lazy } from "react"
import { Routes,Route } from "react-router-dom"


   
const AgentLoginPage = lazy(()=> import ("../pages/agent/AgentLogin") )
const AgentRequestPage = lazy(()=> import ("../pages/agent/AgentRequest") )
const AgentRequestDetailsPage = lazy(()=> import ("../pages/agent/AgentRequestDetails") )



const AgentRoutes = () => {
    return (
        <Routes>
            <Route index element={<AgentLoginPage />} />
            <Route path="AgentLogin" element={<AgentLoginPage />} />   
            <Route path="AgentRequest" element={<AgentRequestPage />} />   
            <Route path="AgentRequestDetails" element={<AgentRequestDetailsPage />} />   
              
         </Routes>
    )
}


export default AgentRoutes;