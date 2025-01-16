// import React from "react"
import { Suspense ,lazy } from "react"
import { Routes,Route } from "react-router-dom"


   
const LoginPage = lazy(()=> import ("../pages/admin/AdminLogin") )
const AgentPage = lazy(()=> import ("../pages/admin/AdminAgents") )
const DashboardPage = lazy(()=> import ("../pages/admin/AdminDashboard") )
const ItemsPage = lazy(()=> import ("../pages/admin/AdminItems") )
const OffersPage = lazy(()=> import ("../pages/admin/AdminOffers") )
const RequestViewPage = lazy(()=> import ("../pages/admin/AdminRequestView") )
const RequestsPage = lazy(()=> import ("../pages/admin/AdminRequests") )
const ServicesPage = lazy(()=> import ("../pages/admin/AdminServices") )
const UsersPage = lazy(()=> import ("../pages/admin/AdminUsers") )


const AdminRoutes = () => {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="Login" element={<LoginPage />} />   
            <Route path="Agents" element={<AgentPage />} />   
            <Route path="Dashboard" element={<DashboardPage />} />   
            <Route path="Items" element={<ItemsPage />} />   
            <Route path="Offers" element={<OffersPage />} />   
            <Route path="RequestView" element={<RequestViewPage />} />   
            <Route path="Requests" element={<RequestsPage />} />   
            <Route path="Services" element={<ServicesPage />} />   
            <Route path="Users" element={<UsersPage />} />   
         </Routes>
    )
}


export default AdminRoutes;