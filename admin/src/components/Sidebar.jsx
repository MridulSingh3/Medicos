import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-200 pt-5 text-sm">
      {aToken && (
        <ul className="flex flex-col gap-1 px-3">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              <img src={assets.home_icon} alt="Home" className="w-5 h-5" />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
              <p className="hidden md:block">Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-docter"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
              <p className="hidden md:block">Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/docter-list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              <img src={assets.people_icon} alt="Doctors List" className="w-5 h-5" />
              <p className="hidden md:block">Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;