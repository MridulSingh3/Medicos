import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white shadow-md">

      {/* Role Badge / Logo Section */}
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold tracking-wide">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg transition-colors duration-300 active:scale-95 shadow-sm"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;