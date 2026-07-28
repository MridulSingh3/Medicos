import React from 'react';
import aboutimg from '../assets/about_image.png';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 text-gray-700">
      {/* Page Title */}
      <div className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-10">
        <h2>
          ABOUT <span className="text-blue-600">US</span>
        </h2>
      </div>

      {/* Main Content: Image & Text */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        {/* Left Side: About Image */}
        <div className="w-full md:w-2/5 flex justify-center">
          <img
            src={aboutimg}
            alt="About Us"
            className="w-full max-w-md rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-3/5 flex flex-col justify-center gap-5 text-sm sm:text-base leading-relaxed text-gray-600">
          <p>
            Welcome to <strong className="text-gray-900 font-semibold">Medicos</strong>, your trusted platform for connecting with experienced and certified healthcare professionals across all specializations. At Medicos, we believe that accessing quality medical care should be simple, fast, and transparent. Whether you're looking for a general physician for a routine check-up or a specialist for expert advice, we’re here to guide you every step of the way.
          </p>

          <p>
            Our mission is to bridge the gap between patients and doctors by providing a seamless booking experience and verified information at your fingertips. Each doctor listed on Medicos is carefully vetted, and we provide detailed profiles including their qualifications, experience, fees, and availability—so you can make informed decisions about your health without stress or confusion.
          </p>

          <div className="pt-2">
            <h3 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">
              Our Vision
            </h3>
            <p>
              At Medicos, we’re more than just a booking service—we’re your health companion. Our platform ensures privacy, prompt support, and a patient-first approach to care. Whether you're at home or on the go, Medicos empowers you to take control of your healthcare journey with confidence and convenience.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-xl">
            <h4 className="font-bold text-base mb-3 group-hover:text-white text-gray-800">
              EFFICIENCY:
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 group-hover:text-blue-100 leading-relaxed">
              Streamlined appointment scheduling that fits seamlessly into your busy lifestyle.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-xl">
            <h4 className="font-bold text-base mb-3 group-hover:text-white text-gray-800">
              CONVENIENCE:
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 group-hover:text-blue-100 leading-relaxed">
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-xl">
            <h4 className="font-bold text-base mb-3 group-hover:text-white text-gray-800">
              PERSONALIZATION:
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 group-hover:text-blue-100 leading-relaxed">
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;