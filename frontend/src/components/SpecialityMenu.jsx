import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center py-16 px-6 text-center max-w-7xl mx-auto"
    >
      {/* Heading & Subtitle */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Find by Speciality
      </h2>
      <p className="sm:w-1/3 text-gray-500 text-sm mt-2 mb-10 leading-relaxed">
        Simply browse through our extensive list of trusted doctors, schedule your appointments hassle-free.
      </p>

      {/* Specialities List */}
      <div className="flex sm:justify-center gap-6 sm:gap-8 pt-5 w-full overflow-x-auto scrollbar-none pb-4">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.slug || item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-16 h-16 sm:w-20 sm:y-20 rounded-full bg-blue-50 flex items-center justify-center p-3 mb-2 shadow-sm group-hover:bg-blue-600 transition-colors duration-300">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-full h-full object-contain group-hover:brightness-200 transition-all"
              />
            </div>
            <p className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;