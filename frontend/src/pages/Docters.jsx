import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { specialityData } from '../assets/assets';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors, currencySymbol } = useContext(AppContext);

  const matched = specialityData.find((s) => s.slug === speciality);
  const selectedSpeciality = matched ? matched.speciality : null;

  useEffect(() => {
    if (!doctors || doctors.length === 0) return;

    if (selectedSpeciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === selectedSpeciality));
    } else {
      setFilterDoc(doctors);
    }

    setLoading(false);
  }, [doctors, selectedSpeciality]);

  const handleSpecialityClick = (slug) => {
    if (speciality === slug) {
      navigate('/doctors');
    } else {
      navigate(`/doctors/${slug}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Title */}
      <p className="text-gray-600 text-sm font-medium">Browse through the doctors specialist.</p>

      {/* Main Container */}
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-2 px-5 border border-blue-600 rounded text-sm font-semibold sm:hidden transition-all ${showFilter ? 'bg-blue-600 text-white' : 'text-blue-600'
            }`}
        >
          {showFilter ? 'Close Filters' : 'Filters'}
        </button>

        {/* Sidebar Filters */}
        <div
          className={`flex-col gap-2.5 text-sm text-gray-600 w-full sm:w-60 flex-shrink-0 ${showFilter ? 'flex' : 'hidden sm:flex'
            }`}
        >
          <p
            onClick={() => navigate('/doctors')}
            className={`w-full pl-4 py-2.5 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${!speciality ? 'bg-blue-50 border-blue-500 text-blue-600 font-bold' : 'hover:bg-gray-50'
              }`}
          >
            All Specialities
          </p>

          {specialityData.map((item) => (
            <p
              key={item.slug}
              onClick={() => handleSpecialityClick(item.slug)}
              className={`w-full pl-4 py-2.5 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${speciality === item.slug
                  ? 'bg-blue-50 border-blue-500 text-blue-600 font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
                }`}
            >
              {item.speciality}
            </p>
          ))}
        </div>

        {/* Doctor Grid Area */}
        <div className="w-full flex-1">
          {/* Section Heading */}
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {selectedSpeciality ? `Doctors specialized in "${selectedSpeciality}"` : 'All Available Doctors'}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500 font-medium animate-pulse">Loading doctors...</p>
            </div>
          ) : filterDoc.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterDoc.map((doc) => (
                <div
                  key={doc._id}
                  onClick={() => {
                    navigate(`/appointment/${doc._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="border border-blue-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-300 bg-white hover:shadow-xl group flex flex-col justify-between"
                >
                  {/* Doctor Image Container */}
                  <div className="bg-blue-50/60 flex justify-center items-center pt-6 pb-2">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-28 h-28 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-md ring-4 ring-white"
                    />
                  </div>

                  {/* Doctor Info Details */}
                  <div className="p-5 text-center flex-1 flex flex-col justify-between">
                    <div>
                      {/* Availability Indicator */}
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

                      {/* Name & Speciality */}
                      <h3 className="text-gray-800 text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                        {doc.name}
                      </h3>
                      <p className="text-blue-600 text-xs font-semibold mt-1">
                        {doc.speciality}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {doc.degree} • {doc.experience}
                      </p>
                    </div>

                    {/* Fees Tag */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                      <span className="text-gray-500 text-xs">Consultation Fee</span>
                      <span className="font-bold text-gray-800">
                        {currencySymbol || '₹'}{doc.fees}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <p className="text-gray-500 text-base font-medium">
                No doctors available for the selected speciality.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;