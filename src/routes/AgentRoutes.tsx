// import React from "react"
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadSpinner from "../components/common/LoadSpinner"
import AgentProtected from "../protected/AgentProtected"; 

const AgentLoginPage = lazy(() => import("../pages/agent/AgentLogin"));
const AgentNewOrdersPage = lazy(() => import("../pages/agent/AgentNewOrders"));
const AgentAcceptedOrdersPage = lazy( () => import("../pages/agent/AgentAcceptedOrders"));
const AgentOrderHistoryPage = lazy( () => import("../pages/agent/AgentOrderHistory"));
const AgentRequestDetailsPage = lazy(() => import("../pages/agent/AgentRequestDetails"));
const AgentSettingsPage = lazy(() => import("../pages/agent/AgentSettings"));
const AgentProfilePage = lazy(() => import("../pages/agent/AgentProfile"));
const AgentMapPage = lazy(() => import("../pages/agent/AgentMap"));
const AgentChangePasswordPage = lazy( () => import("../pages/agent/AgentChangePassword"));

const AgentRoutes = () => {
  return (
    <Suspense fallback={<LoadSpinner />}>

    <Routes>
    <Route element={<AgentProtected />}>

      <Route index element={<AgentNewOrdersPage />} />
      <Route path="newOrders" element={<AgentNewOrdersPage />} />
      <Route path="acceptedOrders" element={<AgentAcceptedOrdersPage />} />
      <Route path="orderHistory" element={<AgentOrderHistoryPage />} />
      <Route path="requestDetails/:orderId"element={<AgentRequestDetailsPage />}/>
      <Route path="settings" element={<AgentSettingsPage />} />
      <Route path="profile" element={<AgentProfilePage />} />
      <Route path="map" element={<AgentMapPage />} />
      <Route path="changePassword" element={<AgentChangePasswordPage />} />
      </Route>
      <Route path="login" element={<AgentLoginPage />} />

    </Routes>

    </Suspense>

  );
};

export default AgentRoutes;
