import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="m-5 w-full max-w-6xl">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        {/* Doctors Card */}
        <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <img src={assets.doctor_icon} alt="Doctors" className="w-14 h-14 bg-blue-50 p-3 rounded-lg" />
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.docters}</p>
            <p className="text-sm font-medium text-gray-500">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <img src={assets.appointment_icon} alt="Appointments" className="w-14 h-14 bg-blue-50 p-3 rounded-lg" />
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
            <p className="text-sm font-medium text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <img src={assets.patients_icon} alt="Patients" className="w-14 h-14 bg-blue-50 p-3 rounded-lg" />
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
            <p className="text-sm font-medium text-gray-500">Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <img src={assets.list_icon} alt="Latest Appointments" className="w-5 h-5" />
          <p className="font-semibold text-gray-800">Latest Appointments</p>
        </div>

        <div className="divide-y divide-gray-100">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/80 transition-colors"
            >
              <img
                src={item.docData?.image || 'https://placehold.co/100x100'}
                alt="Doctor"
                className="w-12 h-12 rounded-full object-cover border border-gray-200 bg-gray-100"
              />
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-800">
                  Doctor: <span className="text-gray-600 font-normal">{item.docData?.name || 'Unknown'}</span>
                </p>
                <p className="font-medium text-gray-800">
                  Patient: <span className="text-gray-600 font-normal">{item.userData?.name || 'Unknown'}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Time: {item.date} {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;