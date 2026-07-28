import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [fees, setFees] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) return toast.error('Doctor image is required!');
    if (!name || !email || !password || !experience || !speciality || !degree || !fees || !about || !address1) {
      return toast.error('Please fill all required fields!');
    }

    try {
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('speciality', speciality);
      formData.append('education', degree);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (data.success) {
        toast.success(data.message || 'Doctor added successfully!');
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setSpeciality('General Physician');
        setDegree('');
        setFees('');
        setAbout('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message || 'Failed to add doctor');
      }
    } catch (error) {
      console.error('Add Doctor Error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen w-full">
      <form onSubmit={onSubmitHandler} className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg max-w-4xl mx-auto border border-gray-100">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Add New Doctor</h2>

        {/* Upload Doctor Image */}
        <div className="flex items-center gap-4 mb-8">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Doctor"
              className="w-20 h-20 rounded-full object-cover border-2 border-dashed border-gray-300 group-hover:border-blue-500 transition-colors"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm font-medium text-gray-600">Upload doctor picture</p>
        </div>

        {/* Two-Column Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                placeholder="Doctor Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Doctor Email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white transition-all"
              >
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((yr) => (
                  <option key={yr} value={`${yr} Year`}>{yr} Year</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                type="number"
                required
                placeholder="Consultation Fees"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white transition-all"
              >
                {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                type="text"
                required
                placeholder="Degree / Qualification"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                type="text"
                required
                placeholder="Address Line 1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                type="text"
                placeholder="Address Line 2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            rows={4}
            placeholder="Write about doctor experience, background, etc."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md active:scale-[0.99] transition-all duration-200"
        >
          Add Doctor
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddDoctor;