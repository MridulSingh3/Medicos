import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      getDoctorsData();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <p className="pb-3 text-lg font-medium text-zinc-700 border-b border-gray-200">
        My Appointments
      </p>

      {/* Appointment List Container */}
      <div className="flex flex-col gap-4 mt-6">
        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((item, index) => {
            const doctor = doctors?.find((d) => d._id === item.docId);

            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr] sm:flex sm:flex-row gap-4 sm:gap-6 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Doctor Image */}
                <div className="bg-blue-50/60 rounded-xl overflow-hidden flex-shrink-0 w-32 h-36 sm:w-36 sm:h-36">
                  <img
                    src={doctor?.image || 'https://placehold.co/150x140?text=No+Image'}
                    alt={doctor?.name || 'Doctor'}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 text-xs text-zinc-600 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-800 font-semibold text-base sm:text-lg">
                      {doctor?.name || 'Doctor Name'}
                    </p>
                    <p className="text-blue-600 font-medium mt-0.5">
                      {doctor?.speciality || 'Speciality'}
                    </p>

                    <p className="text-zinc-700 font-semibold mt-2">Address:</p>
                    <p className="text-xs text-zinc-500">
                      {doctor?.address?.line1 || 'Line 1 missing'}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {doctor?.address?.line2 || 'Line 2 missing'}
                    </p>

                    <p className="text-xs mt-2">
                      <span className="text-zinc-700 font-semibold">Date & Time:</span>{' '}
                      {new Date(item.slotDate).toLocaleDateString("en-GB")} | {item.slotTime}
                    </p>
                  </div>
                </div>

                {/* Button Controls */}
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 justify-end text-xs text-center font-medium">
                  {!item.cancelled && (
                    <>
                      <button className="text-emerald-600 bg-emerald-50 border border-emerald-200 py-2.5 px-6 rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-300 active:scale-95">
                        Pay Online
                      </button>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="text-rose-600 bg-rose-50 border border-rose-200 py-2.5 px-6 rounded-lg hover:bg-rose-600 hover:text-white transition-all duration-300 active:scale-95"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                  {item.cancelled && (
                    <button className="text-red-500 border border-red-200 bg-red-50 py-2.5 px-6 rounded-lg cursor-not-allowed">
                      Appointment Cancelled
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500 text-sm">
            You have no appointments booked yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;