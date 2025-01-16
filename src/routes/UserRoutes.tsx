// import React from "react"
import { Suspense ,lazy } from "react"
import { Routes,Route } from "react-router-dom"


const HomePage = lazy(()=>import ("../pages/user/UserHome") ) 
const LoginPage = lazy(()=>import ("../pages/user/UserLogin") ) 
const OrderConfirmationPage = lazy(()=>import ("../pages/user/UserOrderConfirmation") ) 
const OrderPlacedPage = lazy(()=>import ("../pages/user/UserOrderPlaced") ) 
const SelectClothsPage = lazy(()=>import ("../pages/user/UserSelectCloths") ) 
const SignupPage = lazy(()=>import ("../pages/user/UserSignup") ) 

    

const UserRoutes = () => {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />   
            <Route path="login" element={<LoginPage />} />   
            <Route path="orderconfirmation" element={<OrderConfirmationPage />} />   
            <Route path="orderplaced" element={<OrderPlacedPage />} />   
            <Route path="selectcloths" element={<SelectClothsPage />} />   
            <Route path="signup" element={<SignupPage />} />   
         </Routes>
    )
}



export default UserRoutes;