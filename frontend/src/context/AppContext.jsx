import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '₹';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userData, setUserData] = useState(null);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

      if (data.success) {
        setDoctors(data.docters);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to load doctors");
    }
  };

  //   const loadUserProfileData = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log("✅ Profile API Response:", data);
  //     if (data.success) {
  //       setUserData(data.userData); // ✅ Fixed here
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log("❌ Error fetching profile:", error);
  //     toast.error(error?.response?.data?.message || "Error loading profile.");
  //   }
  // };
  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      // Send both 'token' and 'Authorization' for maximum compatibility
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          token, // Matches simple header setup
          Authorization: `Bearer ${token}` // Matches standard Bearer setup
        }
      });

      console.log("✅ Profile API Response:", data);
      if (data.success) {
        setUserData(data.userData);
        localStorage.setItem("user", JSON.stringify(data.userData));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("❌ Error fetching profile:", error);

      // If account was deleted or token expired/invalid, clean up storage
      if (error.response && (error.response.status === 404 || error.response.status === 401)) {
        setToken('');
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error("Session expired or user not found. Please log in again.");
      } else {
        toast.error(error?.response?.data?.message || "Error loading profile.");
      }
    }
  };


  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
