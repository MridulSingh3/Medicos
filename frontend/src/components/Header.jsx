import React from 'react';
import groupPhoto from '../assets/group_profiles.png';
import arrowimg from '../assets/arrow_icon.svg';
import headerimg from '../assets/header_img.png';

const Header = () => {
  return (
    <div className="relative mx-auto my-6 max-w-7xl px-6 sm:px-10 lg:px-12 py-10 lg:py-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex flex-col md:flex-row items-center justify-between shadow-xl overflow-hidden min-h-[460px]">

      {/* Left Side: Content */}
      <div className="md:w-1/2 flex flex-col items-start gap-5 py-8 md:py-16 lg:py-24 z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Book Appointments <br className="hidden sm:inline" />
          with Trusted Doctors
        </h1>

        {/* Profiles + Subtitle */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 text-white">
          <img
            src={groupPhoto}
            alt="Trusted Profiles"
            className="w-28 sm:w-36 h-auto object-contain shrink-0"
          />
          <p className="text-xs sm:text-sm text-blue-100 font-light leading-relaxed max-w-sm text-center sm:text-left">
            Simply browse through our extensive list of trusted doctors and get the care you need.
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="#speciality"
          className="inline-flex items-center gap-3 bg-white text-blue-600 hover:text-blue-700 font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 mt-2"
        >
          <span>Book Appointment</span>
          <img src={arrowimg} alt="arrow" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/2 w-full flex justify-center md:justify-end items-end relative md:absolute bottom-0 right-0 max-w-lg">
        <img
          src={headerimg}
          alt="Doctors Header"
          className="w-full h-auto max-h-[420px] object-contain object-bottom drop-shadow-xl"
        />
      </div>

    </div>
  );
};

export default Header;