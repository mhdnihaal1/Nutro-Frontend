import React, { useEffect, useState } from "react";
import { CalendarDays, Clock, Shirt, Package, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import UserNavbar from "../../components/user/UserNavbar";
import UserFooter from "../../components/user/UserFooter";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const image6banner = require("../../assets/image6banner.jpg");
const image7banner = require("../../assets/image7banner.jpg");
const image8banner = require("../../assets/image8banner.jpg"); 
const image9banner = require("../../assets/image9banner.avif"); 
const image10banner = require("../../assets/image10banner.avif"); 

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth);
  const User = user?.userInfo;


  const bannerImages = [image6banner, image7banner, image8banner , image9banner , image10banner];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const services = [
    {
      icon: <Shirt className="w-8 h-8 text-blue-600" />,
      title: "Wash & Fold",
      price: "From $2.99/lb",
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: "Dry Cleaning",
      price: "From $5.99/item",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Express Service",
      price: "24h Turnaround",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <UserNavbar />
       {/* Image Slider */}
       <div className="w-full h-[75vh] relative">
  <Slider {...settings}>
    {bannerImages.map((image, index) => (
      <div key={index} className="w-full h-[75vh] relative">
        <img
          src={image}
          alt={`banner-${index}`}
          className="w-full h-[75vh] object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex flex-col items-start text-white text-left px-12 transition-all duration-700 ease-in-out">
          
          {/* Animated Header Text */}
          <h1 className="text-3xl mt-[15vh] md:text-5xl mb-10 font-extrabold tracking-widest  drop-shadow-xl animate-fade-in">
            <span className="text-blue-400  decoration-2 animate-pulse">Clean</span><span className="animate-pulse">Pro Laundry</span>
          </h1>

          {/* Animated Subtext */}
          <p className="mt-2 text-sm md:text-lg font-medium text-gray-300 italic tracking-wider shadow-md animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-gradient">
              Effortless 
            </span>
            <span className="ml-1  pb-[1px]">
              Fresh
            </span>
            <span className="ml-1 text-blue-300  animate-bounce">
              Reliable
            </span>
          </p>

          {/* Animated Decorative Line */}
          <div className="mt-4 w-16 h-[2px] bg-blue-400 animate-expand"></div>
        </div>
      </div>
    ))}
  </Slider>
</div>







      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              to={`/user/selectcloths`}
              key={index}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all border border-gray-200"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.price}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                <CalendarDays className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Schedule</h3>
              <p className="text-gray-600">
                Book a pickup time that works for you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Pickup</h3>
              <p className="text-gray-600">
                We collect your clothes from your doorstep.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Delivery</h3>
              <p className="text-gray-600">
                Clean clothes delivered back to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-600">
          Ready to get started?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Experience the convenience of our premium laundry service today.
        </p>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-2xl">
          Book Now
        </button>
      </div>
     <UserFooter/>
    </div>
  );
};

export default UserHome;
