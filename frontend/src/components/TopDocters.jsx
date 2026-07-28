import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDocters = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/* Title & Description */}
      <h1 className="text-3xl font-bold text-gray-800">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-500">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-5 gap-y-8 px-3 sm:px-0 max-w-7xl">
        {doctors?.slice(0, 10).map((doc) => (
          <div
            key={doc._id}
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-300 bg-white hover:shadow-xl group flex flex-col justify-between"
          >
            {/* Image Wrapper */}
            <div className="bg-blue-50/60 flex justify-center items-center pt-6 pb-2">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-md ring-4 ring-white"
              />
            </div>

            {/* Card Content */}
            <div className="p-5 text-center flex-1 flex flex-col justify-between">
              <div>
                {/* Availability Badge */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${doc.available !== false ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                  ></span>
                  <p
                    className={`text-xs font-semibold ${doc.available !== false ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                  >
                    {doc.available !== false ? 'Available' : 'Not Available'}
                  </p>
                </div>

                {/* Doctor Details */}
                <h3 className="text-gray-800 text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                  {doc.name}
                </h3>
                <p className="text-gray-500 text-xs font-medium mt-1">
                  {doc.speciality}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className="bg-blue-50 text-blue-600 font-semibold px-12 py-3 rounded-full mt-10 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
      >
        More
      </button>
    </div>
  );
};

export default TopDocters;