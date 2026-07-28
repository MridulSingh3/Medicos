import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Registration successful');
          setState('Login');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Login successful');
        } else {
          toast.error(data.message || 'Login failed');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-2xl text-gray-600 text-sm shadow-lg bg-white"
      >
        {/* Branding Header */}
        <div className="w-full text-center pb-2 border-b border-gray-100">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-wide">
            Medicos
          </h1>
        </div>

        {/* Heading */}
        <div className="w-full">
          <p className="text-2xl font-bold text-gray-800">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
          </p>
        </div>

        {/* Name Field (Only in Sign Up) */}
        {state === 'Sign Up' && (
          <div className="w-full">
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
            />
          </div>
        )}

        {/* Email Field */}
        <div className="w-full">
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <label className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2.5 rounded-lg text-base font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-md mt-2"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Switch State Toggle */}
        <div className="w-full text-center text-xs text-gray-600 mt-2">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-600 underline cursor-pointer font-semibold"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-blue-600 underline cursor-pointer font-semibold"
              >
                Sign up now
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;