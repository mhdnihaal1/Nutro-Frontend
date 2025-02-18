// import React from "react"
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadSpinner from "../components/common/LoadSpinner"
import AdminProtected from "../protected/AdminProtected"; 


const LoginPage = lazy(() => import("../pages/admin/AdminLogin"));
const AgentPage = lazy(() => import("../pages/admin/AdminAgents"));
const MapPage = lazy(() => import("../pages/admin/AdminMap"));
const DashboardPage = lazy(() => import("../pages/admin/AdminDashboard"));
const ItemsPage = lazy(() => import("../pages/admin/AdminItems"));
const OffersPage = lazy(() => import("../pages/admin/AdminOffers"));
const RequestViewPage = lazy(() => import("../pages/admin/AdminRequestView"));
const RequestsPage = lazy(() => import("../pages/admin/AdminRequests"));
const ServicesPage = lazy(() => import("../pages/admin/AdminServices"));
const UsersPage = lazy(() => import("../pages/admin/AdminUsers"));
const SettingsPage = lazy(() => import("../pages/admin/AdminSettings"));
const ConcernPage = lazy(() => import("../pages/admin/AdminConcernPage"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadSpinner />}>

    <Routes>

    <Route element={<AdminProtected />}>

      <Route index element={<DashboardPage />} />
      <Route path="Agents" element={<AgentPage />} />
      <Route path="Maps" element={<MapPage />} />
      <Route path="Dashboard" element={<DashboardPage />} />
      <Route path="Items" element={<ItemsPage />} />
      <Route path="Offers" element={<OffersPage />} />
      <Route path="RequestView" element={<RequestViewPage />} />
      <Route path="Requests" element={<RequestsPage />} />
      <Route path="Services" element={<ServicesPage />} />
      <Route path="Users" element={<UsersPage />} />
      <Route path="Settings" element={<SettingsPage />} />
      <Route path="Concerns" element={<ConcernPage />} />
      </Route>
      <Route path="Login" element={<LoginPage />} />

    </Routes>

    </Suspense>

  );
};

export default AdminRoutes;
