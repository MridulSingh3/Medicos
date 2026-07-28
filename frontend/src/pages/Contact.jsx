import React from 'react';
import contactimg from '../assets/contact_image.png';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-gray-700">
      {/* Heading */}
      <div className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-10">
        <h2>
          CONTACT <span className="text-blue-600">US</span>
        </h2>
      </div>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        {/* Contact Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={contactimg}
            alt="Contact"
            className="w-full max-w-md rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Contact Info Card */}
        <div className="w-full md:w-1/2 bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-sm leading-relaxed">
          <h3 className="text-lg font-bold text-blue-600 uppercase tracking-wide mb-3">
            Our Office
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-1">
            281121 Vrindavan, Mathura
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            Mob:{' '}
            <a
              href="tel:+919016000016"
              className="text-gray-800 font-semibold hover:text-blue-600 transition-colors"
            >
              +91 9016000016
            </a>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-bold text-blue-600 uppercase tracking-wide mb-2">
              Careers at Medicos
            </h4>
            <p className="text-sm text-gray-500 mb-5">
              Learn more about our team and job openings.
            </p>

            <button className="border border-blue-600 text-blue-600 font-semibold text-sm px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm active:scale-95">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;