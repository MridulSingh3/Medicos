import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors && doctors.length > 0 && speciality) {
      const related = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(related);
    }
  }, [doctors, speciality, docId]);

  if (relDoc.length === 0) return null;

  return (
    <div className="my-16 px-4 sm:px-0 max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Related Doctors
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {relDoc.map((doc) => (
          <Link
            to={`/appointment/${doc._id}`}
            key={doc._id}
            onClick={() => window.scrollTo(0, 0)}
            className="group bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
          >
            {/* Doctor Image Container */}
            <div className="bg-blue-50/50 flex justify-center items-center pt-6 pb-2 overflow-hidden">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-28 h-28 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-md ring-4 ring-white"
              />
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Status Indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${doc.available !== false ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                  <span className={`text-xs font-semibold ${doc.available !== false ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {doc.available !== false ? 'Available' : 'Not Available'}
                  </span>
                </div>

                {/* Doctor Details */}
                <h4 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {doc.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {doc.degree} • {doc.speciality}
                </p>
              </div>

              {/* Fees Section */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fee
                </span>
                <span className="text-sm font-bold text-blue-600">
                  ₹{doc.fees}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;