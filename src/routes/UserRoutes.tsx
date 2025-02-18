// import React from "react"
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import UserProtected from "../protected/UserProtected"; 
import LoadSpinner from "../components/common/LoadSpinner"


const HomePage = lazy(() => import("../pages/user/UserHome"));
const LoginPage = lazy(() => import("../pages/user/UserLogin"));
const OrderConfirmationPage = lazy( () => import("../pages/user/UserOrderCheckout"));
const OrderPlacedPage = lazy(() => import("../pages/user/UserOrderPlaced"));
const SelectClothsPage = lazy(() => import("../pages/user/UserSelectCloths"));
const SignupPage = lazy(() => import("../pages/user/UserSignup"));
const OtpPage = lazy(() => import("../pages/user/UserOtp"));
const CartPage = lazy(() => import("../pages/user/UserCart"));
const AddressPage = lazy(() => import("../pages/user/UserAddress"));
const ProfilePage = lazy(() => import("../pages/user/UserProfile"));
const PasswordChangePage = lazy(() => import("../pages/user/UserPasswordChange"));
const SettingsPage = lazy(() => import("../pages/user/UserSettings"));
const OrdersPage = lazy(() => import("../pages/user/UserOrders"));
const ContactPage = lazy(() => import("../pages/user/UserContact"));
const ForgotPasswordPage = lazy(() => import("../pages/user/forgotPassword"));
 

const UserRoutes = () => {
  return (
    <Suspense fallback={<LoadSpinner/>}>
    <Routes>
    <Route>

      <Route index element={<HomePage />} />
      <Route path="home" element={<HomePage />} />

      <Route element={<UserProtected />}>
      <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="selectcloths" element={<SelectClothsPage />} />
      <Route path="contact" element={<ContactPage />} />


      <Route path="cart" element={<CartPage />} />
      <Route path="address" element={<AddressPage />} />
      <Route path="checkout" element={<OrderConfirmationPage />} />
      <Route path="orderplaced" element={<OrderPlacedPage />} />
      <Route path="passwordChange" element={<PasswordChangePage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="orders" element={<OrdersPage />} />

      </Route>

      
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="otp" element={<OtpPage />} />
      <Route path="forgetPassword" element={<ForgotPasswordPage />} /> 
    </Routes>
    </Suspense>

  );
};

export default UserRoutes;
