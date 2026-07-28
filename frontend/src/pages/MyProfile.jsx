import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import profile_pic from "../assets/profile_pic.png";

const Myprofile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("❌ Error fetching profile:", error);
      toast.error(error?.response?.data?.message || "Error loading profile.");
    }
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!userData && token) {
      loadUserProfileData();
    }
  }, [token]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 font-medium animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  const getProfileImage = () => {
    return userData?.image && userData.image.trim() !== ""
      ? userData.image
      : profile_pic;
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 sm:p-8 bg-white border border-gray-100 rounded-2xl shadow-lg text-gray-700 text-sm">

      {/* Profile Image & Upload Section */}
      <div className="flex flex-col items-center mb-6">
        {isEdit ? (
          <label htmlFor="image-upload" className="relative cursor-pointer group">
            <img
              src={getProfileImage()}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 p-0.5 opacity-80 group-hover:opacity-60 transition-all"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = profile_pic;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Change
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
        ) : (
          <img
            src={getProfileImage()}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-200 p-0.5 shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profile_pic;
            }}
          />
        )}

        {/* User Name */}
        <div className="mt-4 w-full text-center">
          {isEdit ? (
            <input
              className="bg-gray-50 text-center text-xl font-bold text-gray-800 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
              type="text"
              value={userData.name || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
          )}
        </div>
      </div>

      <hr className="bg-gray-200 h-[1px] border-none my-4" />

      {/* Contact Information */}
      <div className="space-y-3">
        <p className="text-gray-500 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 pb-1">
          Contact Information
        </p>

        <div className="grid grid-cols-[1fr_2fr] items-center gap-y-3 text-xs sm:text-sm">
          <p className="font-semibold text-gray-600">Email:</p>
          <p className="text-blue-600 font-medium truncate">{userData.email}</p>

          <p className="font-semibold text-gray-600">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 text-gray-800"
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-800">{userData.phone || "N/A"}</p>
          )}

          <p className="font-semibold text-gray-600 self-start mt-2">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500 text-gray-800"
                type="text"
                placeholder="Address line 1"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500 text-gray-800"
                type="text"
                placeholder="Address line 2"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-800 leading-snug">
              {userData.address?.line1 || "Line 1"}
              <br />
              {userData.address?.line2 || "Line 2"}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-3 mt-6">
        <p className="text-gray-500 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 pb-1">
          Basic Information
        </p>

        <div className="grid grid-cols-[1fr_2fr] items-center gap-y-3 text-xs sm:text-sm">
          <p className="font-semibold text-gray-600">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 text-gray-800"
              value={userData.gender || "Not Selected"}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-800">{userData.gender || "N/A"}</p>
          )}

          <p className="font-semibold text-gray-600">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 text-gray-800"
              type="date"
              value={userData.dob || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-800">{userData.dob || "N/A"}</p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 text-center">
        {isEdit ? (
          <button
            className="bg-blue-600 text-white font-semibold py-2.5 px-8 rounded-full hover:bg-blue-700 transition-all active:scale-95 shadow-md"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-blue-600 text-blue-600 font-semibold py-2.5 px-8 rounded-full hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

    </div>
  );
};

export default Myprofile;