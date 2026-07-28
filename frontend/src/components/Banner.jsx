import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentImg from '../assets/appointment_img.png';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto max-w-[1000px] my-10 my-16 px-6 sm:px-10 py-8 sm:py-10 bg-blue-600 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-xl">

      {/* Left Side: Content */}
      <div className="flex-1 z-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Book Appointment
        </h2>
        <p className="text-xl sm:text-2xl font-semibold text-blue-100 mt-2 mb-6">
          With 50+ Trusted Doctors
        </p>
        <button
          onClick={() => {
            navigate('/login');
            window.scrollTo(0, 0);
          }}
          className="bg-white text-gray-700 hover:text-blue-600 font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-md"
        >
          Create Account
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 w-full md:w-auto mt-6 md:mt-0 flex justify-center md:justify-end relative">
        <img
          src={AppointmentImg}
          alt="Appointment"
          className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] md:-mt-24 md:-mr-6 object-contain filter drop-shadow-lg"
        />
      </div>

    </div>
  );
};

export default Banner;