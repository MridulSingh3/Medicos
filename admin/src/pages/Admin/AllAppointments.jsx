import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments } = useContext(AdminContext);

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return 'N/A';

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border border-gray-200 rounded-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm">

        {/* Table / Grid Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3.5 px-6 border-b border-gray-200 bg-gray-50 font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* List Items */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors gap-2 sm:gap-0"
          >
            {/* Index */}
            <p className="hidden sm:block font-medium">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                src={item.userData?.image}
                alt="patient"
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
              <span className="font-medium text-gray-800">{item.userData?.name || 'N/A'}</span>
            </div>

            {/* Age */}
            <p className="w-full sm:w-auto text-xs sm:text-sm">
              <span className="sm:hidden font-semibold">Age: </span>
              {calculateAge(item.userData?.dob)}
            </p>

            {/* Date & Time */}
            <p className="w-full sm:w-auto text-xs sm:text-sm">
              {new Date(item.date).toLocaleString()}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                src={item.docData?.image}
                alt="doctor"
                className="w-9 h-9 rounded-full object-cover border border-gray-200 bg-gray-100"
              />
              <span className="text-gray-800">{item.docData?.name || 'N/A'}</span>
            </div>

            {/* Fees */}
            <p className="w-full sm:w-auto font-medium text-gray-800">
              ₹{item.amount || 'N/A'}
            </p>

            {/* Actions */}
            <div className="w-full sm:w-auto flex justify-start sm:justify-center">
              <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors shadow-sm">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;